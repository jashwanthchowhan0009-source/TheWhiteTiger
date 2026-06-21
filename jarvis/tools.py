"""Client-side tools Jarvis can call.

Each tool is a JSON-schema definition (sent to the model) plus a Python
handler. The web search tool is server-side (run by Anthropic) and is added
separately in the agent.
"""

from __future__ import annotations

import os
import subprocess
from datetime import datetime
from typing import Callable

from .config import config
from .memory import Memory


# --- Tool definitions (schemas sent to the model) ---

TOOL_SCHEMAS = [
    {
        "name": "get_datetime",
        "description": "Get the current local date and time.",
        "input_schema": {"type": "object", "properties": {}},
    },
    {
        "name": "read_file",
        "description": "Read the contents of a text file on the local machine.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Path to the file."}
            },
            "required": ["path"],
        },
    },
    {
        "name": "write_file",
        "description": "Write (or overwrite) a text file on the local machine.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Path to the file."},
                "content": {"type": "string", "description": "Text to write."},
            },
            "required": ["path", "content"],
        },
    },
    {
        "name": "run_shell",
        "description": (
            "Run a shell command on the local machine and return its output. "
            "Use for system tasks the user asks for (listing files, git, etc.)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "command": {"type": "string", "description": "The shell command."}
            },
            "required": ["command"],
        },
    },
    {
        "name": "remember",
        "description": (
            "Save a durable fact about the user or context to long-term memory "
            "so it persists across sessions."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "fact": {"type": "string", "description": "The fact to remember."}
            },
            "required": ["fact"],
        },
    },
    {
        "name": "forget",
        "description": "Remove remembered facts that match a query string.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Text to match facts."}
            },
            "required": ["query"],
        },
    },
]


class Toolbox:
    """Holds tool handlers and dispatches calls."""

    def __init__(self, memory: Memory, confirm_cb: Callable[[str], bool] | None = None):
        self.memory = memory
        # confirm_cb(command) -> bool, asked before running shell commands.
        self.confirm_cb = confirm_cb

    def schemas(self) -> list[dict]:
        schemas = list(TOOL_SCHEMAS)
        if not config.allow_shell:
            schemas = [s for s in schemas if s["name"] != "run_shell"]
        return schemas

    def dispatch(self, name: str, args: dict) -> tuple[str, bool]:
        """Run a tool. Returns (result_text, is_error)."""
        handler = getattr(self, f"_tool_{name}", None)
        if handler is None:
            return f"Unknown tool: {name}", True
        try:
            return handler(args), False
        except Exception as exc:  # surface errors to the model so it can recover
            return f"{type(exc).__name__}: {exc}", True

    # --- handlers ---

    def _tool_get_datetime(self, args: dict) -> str:
        return datetime.now().strftime("%A, %d %B %Y, %H:%M:%S")

    def _tool_read_file(self, args: dict) -> str:
        path = os.path.expanduser(args["path"])
        with open(path, "r", encoding="utf-8") as f:
            data = f.read()
        if len(data) > 20000:
            data = data[:20000] + "\n...[truncated]"
        return data

    def _tool_write_file(self, args: dict) -> str:
        path = os.path.expanduser(args["path"])
        with open(path, "w", encoding="utf-8") as f:
            f.write(args["content"])
        return f"Wrote {len(args['content'])} chars to {path}"

    def _tool_run_shell(self, args: dict) -> str:
        if not config.allow_shell:
            return "Shell access is disabled."
        command = args["command"]
        if config.confirm_shell and self.confirm_cb is not None:
            if not self.confirm_cb(command):
                return "User declined to run the command."
        proc = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=60,
        )
        out = (proc.stdout or "") + (proc.stderr or "")
        out = out.strip() or "(no output)"
        if len(out) > 10000:
            out = out[:10000] + "\n...[truncated]"
        return f"exit={proc.returncode}\n{out}"

    def _tool_remember(self, args: dict) -> str:
        return self.memory.remember(args["fact"])

    def _tool_forget(self, args: dict) -> str:
        return self.memory.forget(args["query"])
