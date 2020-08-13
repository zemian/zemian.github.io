title=Minimal HTTPD config file
date=2018-03-04
type=post
tags=httpd
status=published
~~~~~~

If you are looking for small set of httpd config file, here is one I
come up with based on original [httpd
wiki](https://wiki.apache.org/httpd/Minimal_Config):

    # Apache httpd v2.4 minimal configuration
    ServerName localhost
    ServerRoot "/usr/local/apache2"
    Listen 80

    User daemon
    Group daemon

    # Core modules
    LoadModule mpm_worker_module modules/mod_mpm_worker.so
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

    DirectoryIndex index.html
    ErrorLog logs/error.log
    LogFormat "%h %l %u %t \"%r\" %>s %b" common
    CustomLog logs/access.log common

    DocumentRoot "htdocs"
    <Directory "htdocs">
      Options Indexes FollowSymLinks
      AllowOverride None
      Require all granted
    </Directory>

    # Enable CGI support
    LoadModule cgid_module modules/mod_cgid.so
    ScriptAlias /cgi-bin/ "cgi-bin/"
    <Directory "cgi-bin">
        AllowOverride None
        Options None
        Require all granted
    </Directory>
