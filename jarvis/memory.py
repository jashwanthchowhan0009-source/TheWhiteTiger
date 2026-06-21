"""Simple persistent memory: a JSON file of facts Jarvis should remember
across sessions."""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone


class Memory:
    def __init__(self, path: str):
        self.path = path
        self._facts: list[dict] = []
        self._load()

    def _load(self) -> None:
        if os.path.exists(self.path):
            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    self._facts = json.load(f)
            except (json.JSONDecodeError, OSError):
                self._facts = []

    def _save(self) -> None:
        with open(self.path, "w", encoding="utf-8") as f:
            json.dump(self._facts, f, indent=2, ensure_ascii=False)

    def remember(self, fact: str) -> str:
        fact = fact.strip()
        if not fact:
            return "Nothing to remember."
        # Avoid storing near-duplicates.
        if any(fact.lower() == f["fact"].lower() for f in self._facts):
            return "Already remembered that."
        self._facts.append(
            {"fact": fact, "at": datetime.now(timezone.utc).isoformat()}
        )
        self._save()
        return f"Remembered: {fact}"

    def forget(self, query: str) -> str:
        query = query.strip().lower()
        before = len(self._facts)
        self._facts = [f for f in self._facts if query not in f["fact"].lower()]
        removed = before - len(self._facts)
        self._save()
        return f"Forgot {removed} item(s)." if removed else "Nothing matched."

    def all_facts(self) -> list[str]:
        return [f["fact"] for f in self._facts]

    def as_prompt_block(self) -> str:
        facts = self.all_facts()
        if not facts:
            return ""
        lines = "\n".join(f"- {fact}" for fact in facts)
        return f"Here is what you remember about the user and past sessions:\n{lines}"
