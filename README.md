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
  agent.py     core agent + Claude tool loop
  tools.py     client-side tools (files, shell, memory, time)
  memory.py    persistent memory store
  voice.py     optional speech in/out
  config.py    env-based configuration
  cli.py       interactive terminal UI
main.py        entry point
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
