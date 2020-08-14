---
title: How to install posgresql-server with yum on Linux
date: 2016-07-08
tags:
  - postgres
---

If you have a RedHat/CentOS/OracleLinux distro of Linux, then `yum` should be available as your package manager. Here are the notes I have to get PostgreSQL server up running.

    bash> yum info postgresql-server
    bash> # Verify that's the version you want to install
    
    bash> # Ready to install
    bash> sudo su -
    bash> yum -y install postgresql-server
    bash> service postgresql initdb
    
    bash> # Startup the server manually
    bash> service postgresql start
    
    bash> # Make server startup at system reboot
    bash> chkconfig postgresql on
    
    bash> # Verify postgres DB is working
    bash> su - postgres -c psql
    postgres=# \du
    postgres=# \q
    
    bash> # We are done, exit root user shell
    bash> exit
    

If you can't find `service` or `chkconfig` commands, then check to ensure you have have `/sbin` in your `$PATH`.