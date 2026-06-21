"""Client-side tools Jarvis can call.

Each tool is a JSON-schema definition (sent to the model) plus a Python
handler. The web search tool is server-side (run by Anthropic) and is added
separately in the agent.

Desktop-control handlers (open apps, type, media keys, YouTube, ...) lazily
import their heavy/OS-specific dependencies so the core works everywhere.
"""

from __future__ import annotations

import os
import platform
import subprocess
import webbrowser
from datetime import datetime
from typing import Callable

from .config import config
from .memory import Memory

IS_WINDOWS = platform.system() == "Windows"

# Friendly app name -> launch command (Windows `start` resolves most of these).
WINDOWS_APPS = {
    "chrome": "chrome",
    "google chrome": "chrome",
    "browser": "chrome",
    "edge": "msedge",
    "brave": "brave",
    "firefox": "firefox",
    "notepad": "notepad",
    "calculator": "calc",
    "calc": "calc",
    "explorer": "explorer",
    "file explorer": "explorer",
    "files": "explorer",
    "cmd": "cmd",
    "command prompt": "cmd",
    "terminal": "wt",
    "powershell": "powershell",
    "word": "winword",
    "excel": "excel",
    "powerpoint": "powerpnt",
    "vscode": "code",
    "vs code": "code",
    "code": "code",
    "spotify": "spotify",
    "settings": "ms-settings:",
    "task manager": "taskmgr",
    "paint": "mspaint",
    "camera": "microsoft.windows.camera:",
}


# --- Tool definitions (schemas sent to the model) ---

CORE_TOOL_SCHEMAS = [
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
            "Use for system tasks (listing files, git, etc.)."
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

# Desktop / computer-control tools — the heart of the voice assistant.
DESKTOP_TOOL_SCHEMAS = [
    {
        "name": "open_application",
        "description": (
            "Open/launch a desktop application by name (e.g. 'chrome', 'notepad', "
            "'spotify', 'calculator', 'word')."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "The app to open."}
            },
            "required": ["name"],
        },
    },
    {
        "name": "open_website",
        "description": "Open a website / URL in the default browser.",
        "input_schema": {
            "type": "object",
            "properties": {
                "url": {"type": "string", "description": "The URL or domain to open."}
            },
            "required": ["url"],
        },
    },
    {
        "name": "play_youtube",
        "description": "Search YouTube for a query and play the first result in the browser.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "What to play on YouTube."}
            },
            "required": ["query"],
        },
    },
    {
        "name": "web_search_open",
        "description": "Open a Google search for the query in the browser.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query."}
            },
            "required": ["query"],
        },
    },
    {
        "name": "type_text",
        "description": "Type text on the keyboard into whatever window is focused.",
        "input_schema": {
            "type": "object",
            "properties": {
                "text": {"type": "string", "description": "The text to type."}
            },
            "required": ["text"],
        },
    },
    {
        "name": "press_hotkey",
        "description": (
            "Press a keyboard shortcut. Give keys joined by '+', e.g. 'ctrl+t', "
            "'alt+f4', 'win+d', 'enter'."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "keys": {"type": "string", "description": "Keys like 'ctrl+t'."}
            },
            "required": ["keys"],
        },
    },
    {
        "name": "media_control",
        "description": "Control media playback.",
        "input_schema": {
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["play_pause", "next", "previous", "stop"],
                    "description": "The media action.",
                }
            },
            "required": ["action"],
        },
    },
    {
        "name": "volume",
        "description": "Change system volume.",
        "input_schema": {
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["up", "down", "mute"],
                    "description": "Volume action.",
                },
                "steps": {
                    "type": "integer",
                    "description": "How many steps (default 5).",
                },
            },
            "required": ["action"],
        },
    },
    {
        "name": "open_path",
        "description": "Open a file or folder with its default application.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "File or folder path."}
            },
            "required": ["path"],
        },
    },
    {
        "name": "screenshot",
        "description": "Take a screenshot and save it to disk.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "Where to save (default: screenshot.png).",
                }
            },
        },
    },
]


class Toolbox:
    """Holds tool handlers and dispatches calls."""

    def __init__(
        self,
        memory: Memory,
        confirm_cb: Callable[[str], bool] | None = None,
        desktop: bool = True,
    ):
        self.memory = memory
        # confirm_cb(command) -> bool, asked before running shell commands.
        self.confirm_cb = confirm_cb
        self.desktop = desktop

    def schemas(self) -> list[dict]:
        schemas = list(CORE_TOOL_SCHEMAS)
        if not config.allow_shell:
            schemas = [s for s in schemas if s["name"] != "run_shell"]
        if self.desktop:
            schemas += DESKTOP_TOOL_SCHEMAS
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

    # --- core handlers ---

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
            command, shell=True, capture_output=True, text=True, timeout=60
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

    # --- desktop handlers ---

    def _tool_open_application(self, args: dict) -> str:
        name = args["name"].strip().lower()
        if IS_WINDOWS:
            target = WINDOWS_APPS.get(name, name)
            # `start "" target` lets Windows resolve apps from PATH / App Paths.
            subprocess.Popen(f'start "" {target}', shell=True)
            return f"Opening {name}."
        if platform.system() == "Darwin":  # macOS
            subprocess.Popen(["open", "-a", name])
            return f"Opening {name}."
        # Linux
        subprocess.Popen([name])
        return f"Opening {name}."

    def _tool_open_website(self, args: dict) -> str:
        url = args["url"].strip()
        if not url.startswith(("http://", "https://")):
            url = "https://" + url
        webbrowser.open(url)
        return f"Opening {url}"

    def _tool_play_youtube(self, args: dict) -> str:
        query = args["query"].strip()
        try:
            import pywhatkit

            pywhatkit.playonyt(query)
        except Exception:
            # Fallback: open a YouTube search page.
            from urllib.parse import quote_plus

            webbrowser.open(
                f"https://www.youtube.com/results?search_query={quote_plus(query)}"
            )
        return f"Playing '{query}' on YouTube."

    def _tool_web_search_open(self, args: dict) -> str:
        from urllib.parse import quote_plus

        query = args["query"].strip()
        webbrowser.open(f"https://www.google.com/search?q={quote_plus(query)}")
        return f"Searching for '{query}'."

    def _tool_type_text(self, args: dict) -> str:
        import pyautogui

        pyautogui.write(args["text"], interval=0.02)
        return "Typed."

    def _tool_press_hotkey(self, args: dict) -> str:
        import pyautogui

        keys = [k.strip() for k in args["keys"].lower().split("+") if k.strip()]
        pyautogui.hotkey(*keys)
        return f"Pressed {'+'.join(keys)}."

    def _tool_media_control(self, args: dict) -> str:
        import pyautogui

        key = {
            "play_pause": "playpause",
            "next": "nexttrack",
            "previous": "prevtrack",
            "stop": "stop",
        }[args["action"]]
        pyautogui.press(key)
        return f"Media: {args['action']}."

    def _tool_volume(self, args: dict) -> str:
        import pyautogui

        action = args["action"]
        if action == "mute":
            pyautogui.press("volumemute")
            return "Toggled mute."
        steps = int(args.get("steps", 5))
        key = "volumeup" if action == "up" else "volumedown"
        for _ in range(steps):
            pyautogui.press(key)
        return f"Volume {action} ({steps})."

    def _tool_open_path(self, args: dict) -> str:
        path = os.path.expanduser(args["path"])
        if IS_WINDOWS:
            os.startfile(path)  # type: ignore[attr-defined]
        elif platform.system() == "Darwin":
            subprocess.Popen(["open", path])
        else:
            subprocess.Popen(["xdg-open", path])
        return f"Opened {path}"

    def _tool_screenshot(self, args: dict) -> str:
        import pyautogui

        path = os.path.expanduser(args.get("path") or "screenshot.png")
        pyautogui.screenshot().save(path)
        return f"Saved screenshot to {path}"


# Backwards-compatible alias (older imports used TOOL_SCHEMAS).
TOOL_SCHEMAS = CORE_TOOL_SCHEMAS
