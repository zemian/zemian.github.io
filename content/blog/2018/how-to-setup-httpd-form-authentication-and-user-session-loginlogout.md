---
title: How to setup httpd form authentication and user session login/logout
date: 2018-02-27T00:00:00-05:00
tags:
  - httpd
  - authentication
  - session
---

## Configuration setup for `httpd.conf`

Enable modules

	LoadModule auth_form_module modules/mod_auth_form.so
	LoadModule auth_digest_module modules/mod_auth_digest.so
	LoadModule session_module modules/mod_session.so
	LoadModule session_cookie_module modules/mod_session_cookie.so

NOTE: This configuration is only for tutorial purpose and not secured by default! Using Cookies session store is NOT secured! It's recommend you use `mod_session_crypto` to further secure data, or use server side session data store.

Setup users

	# First user and new file
	htpasswd -c /etc/httpd/passwd/passwords test
	# Update/add more user
	htpasswd /etc/httpd/passwd/passwords zemian

NOTE: You need `httpd-tool` package from Cygwin to find `htpasswd` command.

Example of Digest login
```
# Digest Login
<Location "/secured">
	AuthType Basic
	AuthName "Restricted Files"
	AuthBasicProvider file
	AuthUserFile "/etc/httpd/passwd/passwords"
	Require valid-user
</Location>
```

Example of form login
```
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
```

Login page `htdocs/login.html`

	<form method="POST" action="/login">
	  Username: <input type="text" name="httpd_username" value="" />
	  Password: <input type="password" name="httpd_password" value="" />
	  <input type="submit" name="login" value="Login" />
	</form>
	
Logout page `htdocs/logout.html`

	<p>You have been logged out.</p>
	
Secured page `htdocs/secured/index.html`

	<p>This is secured area</p>
