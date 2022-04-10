---
title: How To Create Windows Context Menu Without Admin Rights
date: 2018-03-16T00:00:00-05:00
tags:
  - windows
---

    @REM Base on tips here:
    @REM https://stackoverflow.com/questions/48138681/how-to-add-sublime-text-to-contextual-menu-without-admin-privileges-on-windows

    @reg add "HKEY_CURRENT_USER\Software\Classes\*\shell\Open with Sublime Text 3"         /t REG_SZ /v "" /d "Open with Sublime Text 3"   /f
    @reg add "HKEY_CURRENT_USER\Software\Classes\*\shell\Open with Sublime Text 3"         /t REG_EXPAND_SZ /v "Icon" /d "%st3Path%,0" /f
    @reg add "HKEY_CURRENT_USER\Software\Classes\*\shell\Open with Sublime Text 3\command" /t REG_SZ /v "" /d "C:\Users\zemian\apps\Sublime-Text-Build-3143-x64\sublime_text.exe \"%%1\"" /f

    @REM If you want to remove above
    @REM @reg delete  "HKEY_CURRENT_USER\Software\Classes\*\shell\Open with Sublime Text 3\command" /f >nul 2>&1
    @REM @reg delete  "HKEY_CURRENT_USER\Software\Classes\*\shell\Open with Sublime Text 3" /f >nul 2>&1
