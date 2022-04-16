---
title: How to Create Self-Signed SSL Certificate for Apache
date: 2021-01-08
tags:
- apache
- ssl-certificate
- linux
---

Often you need to test your web application with `https` protocals. Or sometimes you need to put up a REST API service that must be served under this protocol. In these cases, you would want to learn how to generate a self-signed SSL certificate for your Apache web server.


```bash
# Generate SSL certicate
mkdir -p /var/www/example.com/ssl/private
chmod 700 /var/www/example.com/ssl/private

openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
  -keyout /var/www/example.com/ssl/private/apache-selfsigned.key \
  -out /var/www/example.com/ssl/certs/apache-selfsigned.crt

openssl dhparam -out /var/www/example.com/ssl/certs/dhparam.pem 2048
cat /var/www/example.com/ssl/certs/dhparam.pem | \
  tee -a /var/www/example.com/ssl/certs/apache-selfsigned.crt

# TO verify the cert
openssl x509 -in /var/www/example.com/ssl/certs/apache-selfsigned.crt -noout -subject

# Now these files are ready to be use in your apache conf file:
# /var/www/example.com/ssl/certs/apache-selfsigned.crt
# /var/www/example.com/ssl/private/apache-selfsigned.key
```

Now we need to update Apache config files to use above. Let's say we want the default `http` on port `80` to always redirect traffic to `https` on port `443`, then this is what you need to do. 

NOTE: Some Apache server does not install "SSL" module by default. In this case you would need to install it manually first with this command: `sudo yum install mod_ssl`.

NOTE: Depending on your Linux distro, the Apache httpd server usually would have one main `httpd.conf` and a separate `ssl.conf` file and in different location!

Setting up the `/etc/httpd/conf/httpd.conf` file:

```
# Redirect all traffics from http to https
<VirtualHost example.com:80>
    ServerName example.com
    Redirect permanent "/" "https://example.com/"
</VirtualHost>
```

Now in `/etc/httpd/conf.d/ssl.conf` file, add the following:

```
<VirtualHost example.com:443>
    ServerName example.com
    DocumentRoot /var/www/example.com/public
    ErrorLog /var/www/example.com/logs/httpd-error.log
    CustomLog /var/www/example.com/logs/httpd-requests.log combined
    
    <Directory "/var/www/example.com/public">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
       
    # Disable these and use the SSL Parameters below instead
    # SSLProtocol all -SSLv2
    # SSLCipherSuite HIGH:MEDIUM:!aNULL:!MD5:!SEED:!IDEA
    
    # Use Custom SSL Certs
    SSLCertificateFile /var/www/example.com/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /var/www/example.com/ssl/private/apache-selfsigned.key
</VirtualHost>
```

References:
* [Apache HTTPD 2.4 Docs](https://httpd.apache.org/docs/2.4/)
* [How To Create an SSL Certificate on Apache for CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-apache-for-centos-7)
* [CentOS Linux Docs](https://docs.centos.org/en-US/docs/)

