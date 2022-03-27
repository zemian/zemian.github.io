Title: Django with Python 3 and MySQL database
Date: 2014-09-04 00:00:00-05:00
Tags: python,mysql,django



I read many folks are having problems using MySQL db driver with Python 3, especially when setting up a Django app. The default Django 1.6.5 is only supporting the MySQLdb driver and that only works with Python 2.

I have been using mysql-connector-python package with Python 3 and it has built-in django support as well. I had ran into trouble like this [http://bugs.mysql.com/bug.php?id=73232](http://bugs.mysql.com/bug.php?id=73232), but it is fixed now with the latest mysql-connector-python 1.2.3 release. The mysql-connector-python also works with Python 2.7 as well, and it's a pure python library without native code, which makes the install much easier.

When installing mysql-connector-python, ensure you allow external hosted files like this

    pip install --allow-all-external mysql-connector-python

If you are behind a firewall, use the proxy option

    pip install --proxy my_proxy_server --allow-all-external mysql-connector-python

With these, now you can set your Django settings.py file with MySQL engine
    
    DATABASES = {
        'default': {
            'ENGINE': 'mysql.connector.django',
            'NAME': 'mydb',
            'USER': 'myuser',
            'PASSWORD': 'mypassword',
        }
    }

PS: My initial testing with Django 1.7 also works pretty well with mysql-connector-python. How sweet!

UPDATE 07/15/2015:

The django 1.8 documentation now recommends using 'mysqlclient' package if you want to use Python3 with MySQL backend. It should be a drop in replacement for 'MySQLdb'.

