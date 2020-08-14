---
title: Getting started with Apache HTTPD Web Server on Windows
date: 2018-02-27
tags:
  - httpd
  - cygwin
---

Using native Windows Binary (without admin rights)
==================================================

1.  Download one of binary from
    <https://httpd.apache.org/docs/current/platform/windows.html#down>

2.  Unzip a portable version (zip file) into `C:\Apache24`

3.  cd `C:\Apache24\bin` and run httpd.exe

4.  Open browser to <http://localhost>

Press `CTRL+C` to stop the server.

Where is the `httpd.conf`?
--------------------------

The web server config file is located at `C:\Apache24\conf\httpd.conf`

The default document root should be at `C:\Apache24\htdocs`

The default error log file is at `C:\Apache24\logs\error.log`

How to enable cgi-bin scripts
-----------------------------

There is a default `perl` test script under
`C:\Apache24\cgi-bin\printenv.pl`, and if you have native Windows Perl
installed, you need to modify the first line in the script. Example:
`#!/C:/perl5/perl.exe`

Now test it on <http://localhost/cgi-bin/printenv.pl>

Using Python as `cgi-bin` test script
-------------------------------------

Create `C:\Apache24\cgi-bin\printenv.py` script:

    #!C:/Python36/python.exe
    import cgi
    cgi.test()

Test it on <http://localhost/cgi-bin/printenv.py>

Using Cygwin for Windows
========================

1.  Install `httpd` and `httpd-tool` packages in your cygwin

2.  If you have not started `cygserver`, run it now in the background.

3.  Run `apachectl -k start`

4.  Open browser to <http://localhost>

Run `apachectl -k stop` to stop the server.

Where is the `httpd.conf` ?
---------------------------

The web server config file is located at `/etc/httpd/conf/httpd.conf`

The default document root should be at `/srv/www/htdocs`

The default error log file is at `/var/log/httpd/error_log`

How to enable cgi-bin scripts
-----------------------------

1.  Ensure you have installed `perl` package in Cygwin.

2.  Modify `/srv/www/cgi-bin/printenv` file first line with
    `#!/usr/bin/perl`

3.  Run `chmod a+x`

4.  Modify `httpd.conf` to enable `mod_cgi`:

        <IfModule mpm_prefork_module>
                LoadModule cgi_module modules/mod_cgi.so
        </IfModule>

5.  Restart httpd server

Now test it on <http://localhost/cgi-bin/printenv>

You can also test the `/srv/www/cgi-bin/test-cgi` script, but it uses
`#!/usr/bin/sh` instead of `perl`!

If you use default `cgi-bin` folder that are setup with `ScriptAlias`,
then you do not need to add `Options +ExecCGI` line to the conf file.

Using Python as `cgi-bin` test script
-------------------------------------

Create `/srv/www/cgi-bin/printenv.py` script:

    #!/usr/bin/python3
    import cgi
    cgi.test()
