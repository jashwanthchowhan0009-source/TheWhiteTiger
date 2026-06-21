# Installs Jarvis to start automatically at Windows login.
# Run once in PowerShell:  powershell -ExecutionPolicy Bypass -File scripts\install_autostart.ps1

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$vbs = Join-Path $scriptDir "jarvis_silent.vbs"
$startup = [Environment]::GetFolderPath("Startup")
$lnk = Join-Path $startup "Jarvis.lnk"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($lnk)
$shortcut.TargetPath = "wscript.exe"
$shortcut.Arguments = "`"$vbs`""
$shortcut.WorkingDirectory = (Split-Path -Parent $scriptDir)
$shortcut.Description = "Jarvis voice assistant"
$shortcut.Save()

Write-Host "Installed. Jarvis will start at next login."
Write-Host "Shortcut: $lnk"
Write-Host "To remove autostart, delete that shortcut (run: shell:startup)."
