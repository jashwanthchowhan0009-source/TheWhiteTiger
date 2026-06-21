# Jarvis 🤖

Apna personal AI assistant — chat + voice + tools + memory, with a pluggable
LLM backend. Inspired by [usejarvis.dev](https://www.usejarvis.dev/), built to
be your own, hackable, and fully under your control.

Powered by **Claude** (default) — the assistant can search the web, read and
write files, run shell commands, and remember things about you across sessions.

## Features

- **Chat** — natural conversation with a capable agent.
- **Tools** — web search, file read/write, shell commands, date/time.
- **Memory** — durable facts persisted to `jarvis_memory.json` across sessions.
- **Voice** *(optional)* — talk to Jarvis and hear it reply.
- **Always-on desktop control** *(Windows)* — wake-word daemon that opens apps,
  plays YouTube, controls media/volume, types, and runs commands by voice.
- **Pluggable brain** — Claude (full features), **Gemini (free tier, with tools)**,
  or Ollama (local, free, chat-only). OpenAI is scaffolded for you to add.

## Quick start

```bash
# 1. Install
pip install -r requirements.txt

# 2. Configure
cp .env.example .env
#    then edit .env and add your ANTHROPIC_API_KEY
#    (get one at https://console.anthropic.com/)

# 3. Run
python main.py
```

You'll get an interactive prompt:

```
You › what's the time, and remember that I prefer Python
Jarvis › It's Saturday, 14:32. Got it — I'll remember you prefer Python.
```

### Commands

| Command   | What it does                  |
|-----------|-------------------------------|
| `/help`   | show commands                 |
| `/reset`  | clear the conversation        |
| `/memory` | list remembered facts         |
| `/quit`   | exit                          |

### Voice mode

```bash
pip install -r requirements-voice.txt   # needs system audio libs (see file)
python main.py --voice
```

### Free backend: Google Gemini

No card needed — grab a free key at [aistudio.google.com](https://aistudio.google.com):

```bash
# in .env:
JARVIS_PROVIDER=gemini
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-2.0-flash
python main.py
```

Gemini supports the client-side tools (files, shell, memory, time). Web search
is currently a Claude-only feature.

### Local / offline (no API key)

Run a local model with [Ollama](https://ollama.com/):

```bash
ollama pull llama3.1
# in .env:  JARVIS_PROVIDER=ollama
python main.py
```

> Note: the local backend is chat-only — tools, web search, and the agentic
> loop are Claude-backed features.

## 🦾 Always-on voice assistant (Windows)

This is the Iron-Man mode: Jarvis runs in the background, waits for the wake
word **"Jarvis"**, and controls your PC by voice — open apps, play YouTube,
open websites/files, type, control media and volume, run commands, and more.

### 1. Install desktop + voice deps

```powershell
pip install -r requirements.txt
pip install -r requirements-desktop.txt
```

> If `PyAudio` fails to install, get it with: `pip install pipwin && pipwin install pyaudio`

### 2. Pick a free brain

Edit `.env` (copy from `.env.example`):

```
JARVIS_PROVIDER=gemini
GEMINI_API_KEY=your-free-key-from-aistudio.google.com
```

### 3. Run it

```powershell
python main.py --assistant
```

Then just talk:

- *"Jarvis, open Chrome"*
- *"Jarvis, play lofi beats on YouTube"*
- *"Jarvis, open my downloads folder"*
- *"Jarvis, search for the weather in Mumbai"*
- *"Jarvis, volume up"* / *"Jarvis, pause"*
- *"Jarvis, open Notepad and type my shopping list"*

Say **"goodbye Jarvis"** to stop.

### 4. Start automatically when the PC turns on

Jarvis waits for the internet, then starts listening — fully hands-free.

```powershell
powershell -ExecutionPolicy Bypass -File scripts\install_autostart.ps1
```

That adds a Startup shortcut (runs silently, no console window). To remove it,
press `Win+R`, type `shell:startup`, and delete the **Jarvis** shortcut.

> Using a virtual environment? Edit `scripts\start_jarvis.bat` and point
> `PYTHON` at `.venv\Scripts\python.exe`.

### What it can do (tools)

`open_application`, `open_website`, `play_youtube`, `web_search_open`,
`type_text`, `press_hotkey`, `media_control`, `volume`, `open_path`,
`screenshot`, `run_shell`, `read_file`, `write_file`, `remember`/`forget`.

The LLM decides which tools to chain for each spoken request.

## Configuration

All settings live in `.env` (see `.env.example` for the full list):

| Key                  | Default            | Meaning                                  |
|----------------------|--------------------|------------------------------------------|
| `JARVIS_PROVIDER`    | `claude`           | `claude` \| `ollama` \| `openai` \| `gemini` |
| `JARVIS_MODEL`       | `claude-opus-4-8`  | Claude model id                          |
| `JARVIS_EFFORT`      | `high`             | reasoning effort: low/medium/high/max    |
| `JARVIS_ALLOW_SHELL` | `true`             | allow the shell tool                     |
| `JARVIS_CONFIRM_SHELL` | `true`           | ask before each shell command            |

## Project layout

```
jarvis/
  agent.py      core agent + tool loop (Claude / Gemini / Ollama)
  tools.py      tools: desktop control, files, shell, memory, time
  assistant.py  always-on wake-word voice daemon
  memory.py     persistent memory store
  voice.py      speech in/out (STT + TTS)
  config.py     env-based configuration
  cli.py        interactive terminal UI + entry routing
main.py         entry point
scripts/        Windows autostart (.bat / .vbs / install_autostart.ps1)
```

## Extending it

- **Add a tool**: add a schema to `TOOL_SCHEMAS` and a `_tool_<name>` handler in
  `jarvis/tools.py`. The agent picks it up automatically.
- **Add an LLM backend**: implement a `_chat_<provider>` method in
  `jarvis/agent.py` and route to it from `chat()`.
- **New interfaces** (web app, Telegram bot, desktop): import `jarvis.agent.Agent`
  and call `agent.chat(text)` — the core is interface-agnostic.

## Roadmap ideas

- Web UI (chat in the browser) and a Telegram/WhatsApp bridge.
- Streaming responses token-by-token.
- Full tool support for OpenAI / Gemini backends.
- Scheduled tasks / reminders.
