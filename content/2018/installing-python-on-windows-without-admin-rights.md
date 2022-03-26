---
title: Installing Python on Windows Without Admin Rights
date: 2018-06-06T00:00:00-05:00
tags:
    - python
    - install
---

To install Python on Windows without Admin Rights:

1.  Download binary from <https://www.python.org/downloads/windows/>

2.  Run the following in `cmd.exe` terminal.

    ```
    mkdir %USERPROFILE%\apps\python-2.6.6
    msiexec /a python-2.6.6.amd64.msi /qb TARGETDIR=%USERPROFILE%\apps\python-2.6.6
    ```

Starting Python 3.5 the official downloads site already has "Windows
x86-64 embeddable zip file" version you may download. This you may
install without Admin Rights already.

Ref:
<https://stackoverflow.com/questions/2678702/install-python-2-6-without-using-installer-on-win32>
