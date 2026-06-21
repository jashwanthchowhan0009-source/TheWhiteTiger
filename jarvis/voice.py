"""Optional voice I/O: speech-to-text (mic) and text-to-speech.

Imports are lazy so the rest of Jarvis works without audio dependencies.
Install with: pip install -r requirements-voice.txt
"""

from __future__ import annotations


class VoiceError(RuntimeError):
    pass


class Voice:
    def __init__(self):
        try:
            import pyttsx3
            import speech_recognition as sr
        except ImportError as exc:  # pragma: no cover
            raise VoiceError(
                "Voice support needs extra packages. Run:\n"
                "  pip install -r requirements-voice.txt"
            ) from exc

        self._sr = sr
        self._recognizer = sr.Recognizer()
        self._engine = pyttsx3.init()
        self._calibrated = False

    def speak(self, text: str) -> None:
        self._engine.say(text)
        self._engine.runAndWait()

    def listen(self, timeout: int | None = 8, phrase_time_limit: int = 20) -> str:
        with self._sr.Microphone() as source:
            if not self._calibrated:
                self._recognizer.adjust_for_ambient_noise(source, duration=0.5)
                self._calibrated = True
            audio = self._recognizer.listen(
                source, timeout=timeout, phrase_time_limit=phrase_time_limit
            )
        # Uses the free Google Web Speech API by default.
        return self._recognizer.recognize_google(audio)
