"""Always-on voice assistant daemon.

Waits for internet, then listens continuously for the wake word ("Jarvis").
On hearing it, captures the command, runs it through the agent (which can
control the computer via tools), and speaks the reply.

Run with:  python -m jarvis.assistant
"""

from __future__ import annotations

import socket
import time

from .agent import Agent
from .config import config

def _wake_words() -> tuple[str, ...]:
    w = config.wake_word
    return (w, f"hey {w}", f"okay {w}", f"ok {w}")


EXIT_PHRASES = ("goodbye", "stop listening", "shut down", "go to sleep", "band ho jao")


def has_internet(host: str = "8.8.8.8", port: int = 53, timeout: float = 3.0) -> bool:
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except OSError:
        return False


def wait_for_internet(poll: float = 5.0) -> None:
    while not has_internet():
        time.sleep(poll)


def _strip_wake(text: str) -> str:
    low = text.lower()
    # Longest match first so "hey jarvis" strips fully before "jarvis".
    for w in sorted(_wake_words(), key=len, reverse=True):
        idx = low.find(w)
        if idx != -1:
            return text[idx + len(w) :].strip(" ,.!?")
    return ""


def run() -> None:
    from .voice import Voice, VoiceError

    print("Jarvis assistant starting…")
    wait_for_internet()
    print("Internet up.")

    try:
        voice = Voice()
    except VoiceError as exc:
        print(exc)
        return

    try:
        agent = Agent()
    except RuntimeError as exc:
        print(exc)
        return

    lang = config.speech_lang
    voice.speak("Jarvis online and ready.")
    print(
        f"Listening for wake word '{config.wake_word}'… "
        f"(provider: {config.provider}, lang: {lang})"
    )

    while True:
        # 1) Listen (short) for the wake word.
        try:
            heard = voice.listen(
                timeout=None, phrase_time_limit=5, language=lang
            ).lower()
        except Exception:
            continue  # timeout / no speech / not understood

        if not any(w in heard for w in _wake_words()):
            continue

        # 2) Got the wake word. The command may be in the same phrase…
        command = _strip_wake(heard)
        if not command:
            # …otherwise prompt and listen for the command.
            voice.speak("Yes?")
            try:
                command = voice.listen(
                    timeout=6, phrase_time_limit=15, language=lang
                ).strip()
            except Exception:
                voice.speak("I didn't catch that.")
                continue

        if not command:
            continue

        print(f"You: {command}")

        if any(p in command.lower() for p in EXIT_PHRASES):
            voice.speak("Goodbye.")
            break

        # 3) Run it through the agent (which can act on the computer).
        try:
            reply = agent.chat(command)
        except Exception as exc:
            print(f"Error: {exc}")
            voice.speak("Sorry, something went wrong.")
            continue

        print(f"Jarvis: {reply}")
        # Speak a trimmed version (don't read huge outputs aloud).
        spoken = reply if len(reply) <= 600 else reply[:600] + "…"
        voice.speak(spoken)


if __name__ == "__main__":
    run()
