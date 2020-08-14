---
title: How to initialize a new MySQL installation and create new database
date: 2014-06-11
tags:
  - mysql
---

     

For a freshly installed MySQL server, you would need to initialize the system tables and data directory like this:

     

    cd mysql-<version> 

    scripts/mysql_install_db --basedir=. --datadir=data
    bin/mysqld_safe --defaults-file=my.cnf &

     

Before MySQL 5.6, this will setup a "root" with empty password that you can immediately login. For MySQL 5.7 however, it creates a random password for "root" user now. The password is generated under $HOME/.mysql_secret. You need to login and run "SET PASSWORD = PASSWORD('secret')" to change it.

After above, you may login using "root" and start creating your own database and users. For example:

    CREATE DATABASE mydb;
    GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'%' IDENTIFIED BY 'secret';
    GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost' IDENTIFIED BY 'secret';

UPDATE 2015-01-26 

Here are more notes to replace/upgrade existing mysql server and install to init.d to auto start by OS.

= Install and Setup new MySQL into an exiting Linux.

== To remove/dislable old existing mysqld init.d (one usually defualt installed under /usr/mysql)
sudo /sbin/chkconfig --del mysqld

== Install new mysql server (5.6.16)
    * Ensure mysql user exists and installation files are owned by this user
# Setup and initial the new mysql server 
groupadd mysql
useradd -r -g mysql mysql 
cd /apps/mysql
sudo chown -R mysql:mysql .
sudo scripts/mysql_install_db --basedir=/apps/mysql --datadir=/apps/mysql/data --user=mysql

# Optional: Manually start the server and see if it works
# sudo bin/mysqld_safe --defaults-file=/apps/mysql/my.cnf --user=mysql
# sudo bin/mysqladmin shutdown -u root

# Install the init.d script to start server upon system reboot 
sudo ln -s support-file/mysql.server /etc/init.d/mysql.server
sudo vim support-file/mysql.server
    * Ensure these vars are set correctly in your env
basedir=/apps/mysql
datadir=/apps/mysql/data
cnffile=/apps/mysql/my.cnf
user=mysql
    * modify the mysqld_safe command line to add (ENSURE --user option comes last!)
    --defaults-file=$cnffile --user=$user
    
sudo /sbin/chkconfig --add mysql.server
sudo /sbin/service mysql.server start
    
== Change MySQL root password
        sudo bin/mysqladmin password 'new_password'

Ref:
[https://dev.mysql.com/doc/refman/5.6/en/binary-installation.html](https://dev.mysql.com/doc/refman/5.6/en/binary-installation.html)