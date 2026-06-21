"""The core agent: holds conversation state and drives the LLM tool loop."""

from __future__ import annotations

from typing import Callable

from .config import config
from .memory import Memory
from .tools import Toolbox

SYSTEM_PROMPT = """You are Jarvis, a personal AI assistant for your user.

You are capable, direct, and warm — a trusted right hand, not a chatbot.
- Lead with the answer or the action; keep chatter minimal.
- Use your tools when they help: search the web for current facts, read/write
  files, run shell commands, and check the time.
- When you learn a durable fact about the user (preferences, projects, names,
  recurring context), save it with the `remember` tool so you keep it across
  sessions. Do this proactively but quietly.
- Before running a shell command that changes the system, make sure it's what
  the user wants.
- If you don't know something and can't find it, say so plainly."""


def _gemini_convert_schema(node: dict) -> dict:
    """Convert a JSON-schema node to Gemini's format (uppercase types)."""
    out: dict = {}
    if "type" in node:
        out["type"] = node["type"].upper()
    if "description" in node:
        out["description"] = node["description"]
    if "enum" in node:
        out["enum"] = node["enum"]
    if "properties" in node:
        out["properties"] = {
            k: _gemini_convert_schema(v) for k, v in node["properties"].items()
        }
    if "required" in node:
        out["required"] = node["required"]
    if "items" in node:
        out["items"] = _gemini_convert_schema(node["items"])
    return out


def _gemini_declaration(schema: dict) -> dict:
    """Turn a Jarvis tool schema into a Gemini function_declaration."""
    decl = {"name": schema["name"], "description": schema["description"]}
    params = schema.get("input_schema", {})
    # Gemini rejects an empty parameters object — omit it for no-arg tools.
    if params.get("properties"):
        decl["parameters"] = _gemini_convert_schema(params)
    return decl


class Agent:
    def __init__(self, confirm_cb: Callable[[str], bool] | None = None):
        self.memory = Memory(config.memory_path)
        self.toolbox = Toolbox(self.memory, confirm_cb=confirm_cb)
        self.messages: list[dict] = []
        self._client = None
        if config.provider == "claude":
            self._init_claude()

    def _init_claude(self) -> None:
        import anthropic

        if not config.anthropic_api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY is not set. Add it to your .env file "
                "(copy .env.example), or set JARVIS_PROVIDER=ollama for a local model."
            )
        self._client = anthropic.Anthropic(api_key=config.anthropic_api_key)

    def _system(self) -> str:
        mem = self.memory.as_prompt_block()
        return SYSTEM_PROMPT + ("\n\n" + mem if mem else "")

    # --- public API ---

    def chat(self, user_text: str) -> str:
        if config.provider == "claude":
            return self._chat_claude(user_text)
        if config.provider == "gemini":
            return self._chat_gemini(user_text)
        if config.provider == "ollama":
            return self._chat_ollama(user_text)
        raise RuntimeError(
            f"Provider '{config.provider}' is not implemented yet. "
            "Use 'claude' (full features) or 'ollama' (local, chat-only)."
        )

    # --- Claude backend (full agentic loop with tools) ---

    def _chat_claude(self, user_text: str) -> str:
        self.messages.append({"role": "user", "content": user_text})

        tools = self.toolbox.schemas() + [
            {"type": "web_search_20260209", "name": "web_search"}
        ]

        final_text = ""
        for _ in range(12):  # safety bound on tool-loop iterations
            response = self._client.messages.create(
                model=config.model,
                max_tokens=16000,
                system=self._system(),
                messages=self.messages,
                tools=tools,
                thinking={"type": "adaptive"},
                output_config={"effort": config.effort},
            )
            self.messages.append({"role": "assistant", "content": response.content})

            if response.stop_reason == "tool_use":
                tool_results = []
                for block in response.content:
                    if block.type == "tool_use":  # client-side custom tool
                        result, is_error = self.toolbox.dispatch(
                            block.name, dict(block.input)
                        )
                        tool_results.append(
                            {
                                "type": "tool_result",
                                "tool_use_id": block.id,
                                "content": result,
                                "is_error": is_error,
                            }
                        )
                if tool_results:
                    self.messages.append({"role": "user", "content": tool_results})
                    continue
                # Only server-side tools ran; nothing to send back — keep going.
                continue

            if response.stop_reason == "pause_turn":
                # Server tool loop paused; resend to resume.
                continue

            # Done — collect text.
            final_text = "".join(
                b.text for b in response.content if b.type == "text"
            )
            break

        return final_text.strip() or "(no response)"

    # --- Gemini backend (free tier, with client-side tools) ---

    def _chat_gemini(self, user_text: str) -> str:
        import requests

        if not config.gemini_api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is not set. Get a free key at "
                "https://aistudio.google.com and add it to your .env file."
            )

        self.messages.append({"role": "user", "parts": [{"text": user_text}]})

        tools = [
            {
                "function_declarations": [
                    _gemini_declaration(s) for s in self.toolbox.schemas()
                ]
            }
        ]
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{config.gemini_model}:generateContent?key={config.gemini_api_key}"
        )
        base = {
            "system_instruction": {"parts": [{"text": self._system()}]},
            "tools": tools,
        }

        for _ in range(12):
            body = {**base, "contents": self.messages}
            resp = requests.post(url, json=body, timeout=120)
            resp.raise_for_status()
            candidates = resp.json().get("candidates", [])
            if not candidates:
                return "(no response)"
            parts = candidates[0].get("content", {}).get("parts", [])
            self.messages.append({"role": "model", "parts": parts})

            calls = [p["functionCall"] for p in parts if "functionCall" in p]
            if calls:
                results = []
                for call in calls:
                    result, _is_error = self.toolbox.dispatch(
                        call["name"], dict(call.get("args", {}))
                    )
                    results.append(
                        {
                            "functionResponse": {
                                "name": call["name"],
                                "response": {"result": result},
                            }
                        }
                    )
                self.messages.append({"role": "user", "parts": results})
                continue

            text = "".join(p.get("text", "") for p in parts if "text" in p)
            return text.strip() or "(no response)"

        return "(stopped after too many tool calls)"

    # --- Ollama backend (local, chat-only, no tools) ---

    def _chat_ollama(self, user_text: str) -> str:
        import requests

        self.messages.append({"role": "user", "content": user_text})
        payload = {
            "model": config.ollama_model,
            "messages": [{"role": "system", "content": self._system()}]
            + self.messages,
            "stream": False,
        }
        resp = requests.post(
            f"{config.ollama_host}/api/chat", json=payload, timeout=300
        )
        resp.raise_for_status()
        text = resp.json()["message"]["content"]
        self.messages.append({"role": "assistant", "content": text})
        return text.strip()

    def reset(self) -> None:
        self.messages = []
