"""Configuration loaded from environment / .env file."""

from __future__ import annotations

import os
from dataclasses import dataclass

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # dotenv is optional at runtime
    pass


def _bool(name: str, default: bool) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.strip().lower() in {"1", "true", "yes", "on"}


@dataclass
class Config:
    provider: str = os.getenv("JARVIS_PROVIDER", "claude").lower()

    # Claude
    anthropic_api_key: str | None = os.getenv("ANTHROPIC_API_KEY")
    model: str = os.getenv("JARVIS_MODEL", "claude-opus-4-8")
    effort: str = os.getenv("JARVIS_EFFORT", "high")

    # Ollama
    ollama_host: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    ollama_model: str = os.getenv("OLLAMA_MODEL", "llama3.1")

    # Other providers
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY")
    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

    # Behaviour
    allow_shell: bool = _bool("JARVIS_ALLOW_SHELL", True)
    confirm_shell: bool = _bool("JARVIS_CONFIRM_SHELL", True)

    # Voice / assistant
    # Speech-recognition language. en-IN handles Indian-accented English (and
    # Hinglish) well; use hi-IN for mostly-Hindi, en-US for US English.
    speech_lang: str = os.getenv("JARVIS_LANG", "en-IN")
    wake_word: str = os.getenv("JARVIS_WAKE_WORD", "jarvis").lower()

    memory_path: str = os.getenv("JARVIS_MEMORY_PATH", "jarvis_memory.json")


config = Config()
