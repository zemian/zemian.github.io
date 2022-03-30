---
title: How to run nginx and setup reverse proxy to Tomcat
date: 2017-08-04T00:00:00-05:00
tags:
  - nginx
  - tomcat
---

Basic `nginx` usage
===================
```
# start
cd ~/apps/nginx-1.13.7
./nginx -c conf/nginx.conf

# stop
./nginx -c conf/nginx.conf -s stop
```
How to setup nginx reverse proxy to Tomcat
==========================================
```
# nginx.conf
server {
        listen       80;
        server_name  localhost;

        location / {
                proxy_pass http://localhost:8080;
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
        }
}
```
Setup to setup nginx ssl and reverse proxy to Tomcat
====================================================
```
# ssl setup
cd ~/apps/nginx-1.13.7/conf
openssl req -x509 -nodes -newkey rsa:2048 -keyout cert.key -out cert.crt

# nginx.conf
server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      cert.crt;
    ssl_certificate_key  cert.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
                    proxy_pass http://localhost:8080;
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }
}
```
