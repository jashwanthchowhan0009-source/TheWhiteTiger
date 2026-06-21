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
