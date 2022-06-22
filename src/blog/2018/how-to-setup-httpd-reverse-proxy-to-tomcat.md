---
title: How to setup Httpd Reverse Proxy To Tomcat
date: 2018-03-05T00:00:00-05:00
tags:
  - httpd
  - reverse
  - proxy
  - tomcat
---

Here is an example on how to configure `httpd` server with reverse proxy
into Tomcat, and adding the authenticated user as header and passing to
Tomcat server.

Here is an example of `httpd.conf` config file:

{% verbatim %}
```
# Apache httpd v2.4 minimal configuration
ServerRoot "/etc/httpd"
Listen 80

LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
LoadModule unixd_module modules/mod_unixd.so
LoadModule authz_core_module modules/mod_authz_core.so
LoadModule authz_user_module modules/mod_authz_user.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule dir_module modules/mod_dir.so

# Other useful features
LoadModule mime_module modules/mod_mime.so
LoadModule autoindex_module modules/mod_autoindex.so
LoadModule status_module modules/mod_status.so
LoadModule alias_module modules/mod_alias.so
LoadModule env_module modules/mod_env.so
LoadModule setenvif_module modules/mod_setenvif.so
LoadModule filter_module modules/mod_filter.so
LoadModule ext_filter_module modules/mod_ext_filter.so

DirectoryIndex index.html
ErrorLog /var/log/httpd/error.log
LogFormat "%h %l %u %t \"%r\" %>s %b" common
CustomLog /var/log/httpd/access.log common
<Directory />
  AllowOverride None
  Require all denied
</Directory>

DocumentRoot "/srv/www/htdocs"
<Directory "/srv/www/htdocs">
  Require all granted
</Directory>

# Tomcat Reverse Proxy setup
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
LoadModule request_module modules/mod_request.so

LoadModule auth_form_module modules/mod_auth_form.so
LoadModule auth_digest_module modules/mod_auth_digest.so
LoadModule authn_core_module modules/mod_authn_core.so
LoadModule authn_file_module modules/mod_authn_file.so
LoadModule session_module modules/mod_session.so
LoadModule session_cookie_module modules/mod_session_cookie.so

ProxyPass "/jspwebapp" "http://localhost:8080/jspwebapp"
ProxyPassReverse "/jspwebapp" "http://localhost/jspwebapp"
ProxyPass "/jspwebapp2" "http://localhost:8080/jspwebapp2"
ProxyPassReverse "/jspwebapp2" "http://localhost/jspwebapp2"

# HTTPD Form Login/logout process
<LocationMatch "/(jspwebapp|jspwebapp2)">
        Require valid-user
        AuthName "SecuredArea"
        AuthFormProvider file
        AuthUserFile "/etc/httpd/passwd/passwords"
        AuthType form
        AuthFormLoginRequiredLocation "/login.html"

        Session On
        SessionCookieName session path=/
        SessionMaxAge 1800
        SessionEnv On
        SessionHeader X-Replace-Session

        RewriteEngine On
        RewriteRule .* - [env=X_REMOTE_USER:%{LA-U:REMOTE_USER}]
        RequestHeader set appuser "%{X_REMOTE_USER}e"
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
        SessionMaxAge 1800
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
{% endverbatim %}
