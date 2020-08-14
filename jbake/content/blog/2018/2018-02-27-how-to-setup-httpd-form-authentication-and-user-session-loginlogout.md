---
title: How to setup httpd form authentication and user session login/logout
date: 2018-02-27
tags:
  - httpd
  - authentication
  - session
---

Configuration setup for `httpd.conf`
====================================

**Enable modules.**

LoadModule auth\_form\_module modules/mod\_auth\_form.so LoadModule
auth\_digest\_module modules/mod\_auth\_digest.so LoadModule
session\_module modules/mod\_session.so LoadModule
session\_cookie\_module modules/mod\_session\_cookie.so

This configuration is only for tutorial purpose and not secured by
default! Using Cookies session store is NOT secured! It’s recommend you
use `mod_session_crypto` to further secure data, or use server side
session data store.

**Setup users.**

\# First user and new file htpasswd -c /etc/httpd/passwd/passwords test
\# Update/add more user htpasswd /etc/httpd/passwd/passwords zemian

You need `httpd-tool` package from Cygwin to find `htpasswd` command.

**Example of Digest login.**

    # Digest Login
    <Location "/secured">
            AuthType Basic
            AuthName "Restricted Files"
            AuthBasicProvider file
            AuthUserFile "/etc/httpd/passwd/passwords"
            Require valid-user
    </Location>

**Example of form login.**

    # Form Login/logout process
    <LocationMatch "(/secured|/cgi-bin/secured)">
            Require valid-user
            AuthName "SecuredArea"
            AuthFormProvider file
            AuthUserFile "/etc/httpd/passwd/passwords"
        AuthType form
            AuthFormLoginRequiredLocation "/login.html"

            Session On
            SessionCookieName session path=/
            SessionMaxAge 30
            SessionEnv On
            SessionHeader X-Replace-Session
    </LocationMatch>
    <Location "/login">
            SetHandler form-login-handler
            AuthName "SecuredArea"
            AuthFormProvider file
            AuthUserFile "/etc/httpd/passwd/passwords"
        AuthType form
            AuthFormLoginRequiredLocation "/login.html"
        AuthFormLoginSuccessLocation "/secured/index.html"

            Session On
            SessionCookieName session path=/
    </Location>
    <Location "/logout">
            SetHandler form-logout-handler
            AuthName "SecuredArea"
            AuthFormLogoutLocation "http://localhost/logout.html"

            Session On
            SessionCookieName session path=/
            SessionMaxAge 1
    </Location>

**Login page `htdocs/login.html`.**

&lt;form method="POST" action="/login"&gt; Username: &lt;input
type="text" name="httpd\_username" value="" /&gt; Password: &lt;input
type="password" name="httpd\_password" value="" /&gt; &lt;input
type="submit" name="login" value="Login" /&gt; &lt;/form&gt;

**Logout page `htdocs/logout.html`.**

&lt;p&gt;You have been logged out.&lt;/p&gt;

**Secured page `htdocs/secured/index.html`.**

&lt;p&gt;This is secured area&lt;/p&gt;
