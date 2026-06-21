' Runs start_jarvis.bat with no visible console window.
' Put a shortcut to this file in the Startup folder (shell:startup) to
' launch Jarvis automatically at login.
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
Set shell = CreateObject("WScript.Shell")
shell.Run """" & scriptDir & "\start_jarvis.bat""", 0, False
