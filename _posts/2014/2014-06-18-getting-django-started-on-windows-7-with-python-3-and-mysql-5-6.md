---
title: Getting django started on Windows 7 with python 3 and MySQL 5.6
date: 2014-06-18T00:00:00-05:00
tags:
  - django
  - python
  - mysql
---
Django is a python web framework library and it works on both python 2 or 3. I will show you how to get python 3 setup in Cygwin environment.

If you're on a Windows OS, the best experience I have when working with Django on Windows is to use Cygwin, a Unix emulator shell that runs on Windows. The pip and django commands would automatically setup in Cygwin's PATH after installed. The default python package on Cygwin is only 2.7 though, so you have to search for "python3" package to get the latest python version. And you can have both versions installed without problem, but the executable are named "python" and "python3" respectively.

1. Install Cygwin python3 package. Verify "python3 -V" is working. 

2. Install "pip" by downloading this "get-pip.py" file from [http://pip.readthedocs.org/en/latest/installing.html](http://pip.readthedocs.org/en/latest/installing.html) and then run "python3 get-pip.py". Verify "pip3 --version" is working.

(NOTE: If you are running Windows 7, you might run into this issue: [https://github.com/pypa/pip/issues/1448](https://github.com/pypa/pip/issues/1448) where pip exit without a warning. In this case the workaround is install Cygwin "`binutils`" and "`libuuid-devel" `packages, and that fixed the problem for me.)

3. Install "django" by running "pip3 install django"

4. Finally install the MySQL driver with "pip3 install mysql-connector-python --allow-external mysql-connector-python" command.

Now to get a django project started, try these:

     

    django-admin.py startproject myapp

     

The "django-admin.py" script should automatically in your PATH. and this create a new project with initial settings. To switch default database from SQLite3 to MySQL, change the "myapp/settings.py" with the following:

    DATABASES = {
        'default': {
            'NAME': 'mydb',
            'ENGINE': 'mysql.connector.django',
            'USER': 'root',
            'PASSWORD': 'secret',
        }
    }

Now I assume you have MySQL 5.6+ installed on your Windows already. Change the root password to match yours or using different DB user. You can now have django app setup the initial database schema tables for this specif myapp with this commad:

     

    cd myapp

    python3 manage.py syncdb

     

Follow the prompt and setup your admin user. Now you can start django web app:

     

    python3 manage.py runserver 

      

Open browser to http://localhost:8000/admin. Now try to login and enjoy!

References:
[https://www.python.org](https://www.python.org/)
[http://cygwin.com](http://cygwin.com/)
[http://dev.mysql.com](http://dev.mysql.com/)
[https://docs.djangoproject.com](https://docs.djangoproject.com/)
