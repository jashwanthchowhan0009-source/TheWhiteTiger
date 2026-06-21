@echo off
REM Launch the always-on Jarvis voice assistant.
REM Edit PYTHON below if you use a virtual environment.

cd /d "%~dp0\.."

set PYTHON=python
REM Example for a venv:  set PYTHON=%~dp0\..\.venv\Scripts\python.exe

%PYTHON% -m jarvis.assistant
