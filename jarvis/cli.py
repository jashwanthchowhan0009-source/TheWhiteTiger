"""Interactive command-line interface for Jarvis."""

from __future__ import annotations

import argparse
import sys

from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel

from .agent import Agent
from .config import config

console = Console()


def _confirm_shell(command: str) -> bool:
    console.print(
        Panel(command, title="[yellow]Run this command?[/]", border_style="yellow")
    )
    answer = console.input("[yellow]Allow? [y/N] [/]").strip().lower()
    return answer in {"y", "yes"}


HELP = """\
[bold]Commands[/]
  /help     show this help
  /reset    clear the conversation
  /memory   list remembered facts
  /quit     exit
"""


def run(use_voice: bool = False) -> None:
    try:
        agent = Agent(confirm_cb=_confirm_shell)
    except RuntimeError as exc:
        console.print(f"[red]{exc}[/]")
        sys.exit(1)

    voice = None
    if use_voice:
        from .voice import Voice, VoiceError

        try:
            voice = Voice()
        except VoiceError as exc:
            console.print(f"[red]{exc}[/]")
            sys.exit(1)

    model_label = {
        "claude": config.model,
        "gemini": config.gemini_model,
        "ollama": config.ollama_model,
    }.get(config.provider, "")
    console.print(
        Panel.fit(
            f"[bold cyan]Jarvis[/] online — provider: [green]{config.provider}[/]"
            + (f", model: [green]{model_label}[/]" if model_label else "")
            + "\nType [bold]/help[/] for commands.",
            border_style="cyan",
        )
    )

    while True:
        try:
            if voice is not None:
                console.print("[dim]Listening…[/]")
                try:
                    user = voice.listen()
                except Exception as exc:
                    console.print(f"[dim](didn't catch that: {exc})[/]")
                    continue
                console.print(f"[bold blue]You:[/] {user}")
            else:
                user = console.input("[bold blue]You ›[/] ").strip()
        except (EOFError, KeyboardInterrupt):
            console.print("\n[dim]Bye.[/]")
            break

        if not user:
            continue

        if user.startswith("/"):
            cmd = user.lower()
            if cmd in {"/quit", "/exit", "/q"}:
                console.print("[dim]Bye.[/]")
                break
            if cmd == "/help":
                console.print(HELP)
                continue
            if cmd == "/reset":
                agent.reset()
                console.print("[dim]Conversation cleared.[/]")
                continue
            if cmd == "/memory":
                facts = agent.memory.all_facts()
                console.print("\n".join(f"• {f}" for f in facts) or "[dim]Nothing yet.[/]")
                continue
            console.print("[dim]Unknown command. Try /help[/]")
            continue

        with console.status("[cyan]Thinking…[/]"):
            try:
                reply = agent.chat(user)
            except Exception as exc:
                console.print(f"[red]Error: {exc}[/]")
                continue

        console.print("[bold green]Jarvis ›[/]")
        console.print(Markdown(reply))
        if voice is not None:
            voice.speak(reply)


def main() -> None:
    parser = argparse.ArgumentParser(description="Jarvis — personal AI assistant")
    parser.add_argument(
        "--voice", action="store_true", help="enable speech in/out"
    )
    args = parser.parse_args()
    run(use_voice=args.voice)


if __name__ == "__main__":
    main()
