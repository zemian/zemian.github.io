---
title: How to setup a new Trac issue tracking system
date: 2015-10-21T00:00:00-05:00
tags:
  - python
  - issue-tracker
---
Here is how I setup a local instance of Trac (a python based issue tracking web application) on my Mac.

Prerequisite: MySQL 5.6 and Python 2.7 (Python3 will not work with Trac yet!)

Step1: Setup a Trac database and a user

    sql> CREATE DATABASE trac DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
    sql> CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev123';
    sql> GRANT ALL ON trac.* TO 'dev'@'localhost';
    

    Step2: Install MySQL adaptor for Python and Trac

    bash> pip install Genshi trac mysqlclient
    

    Step3: Setup a Track instance

    bash> trac-admin /Users/zemian/dev/mytrac intent

    bash> # Above will prompt you to enter a backend string. Use
    bash> # this connection string: 

    bash> #   mysql://dev:dev123@localhost:3306/trac

    Step3: Create a Trac admin user

    bash> htpasswd -c /Users/zemian/dev/mytrac/.htpasswd admin

    Step4: Run Track

    bash> tracd -p 8000 --basic-auth="mytrac,/Users/zemian/dev/mytrac/.htpasswd,mytrac" /Users/zemian/dev/metric
