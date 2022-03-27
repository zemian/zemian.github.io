Title: mysqlclient gives "Library not loaded - libmysqlclient.18.dylib" error
Date: 2015-10-16 00:00:00-05:00
Tags: python,mysql


If you want to use python MySQLdb module (eg: if you run Trac with MySQL backend), you would need first install MySQL server on MacOSX, then install the mysqlclient python package using pip. However upon verifying it, you may encounter error like this:

```
(mypy-test)Zemians-Air:dev zemian$ pip install mysqlclient

Collecting mysqlclient

  Using cached mysqlclient-1.3.6.tar.gz

Building wheels for collected packages: mysqlclient

  Running setup.py bdist_wheel for mysqlclient

  Stored in directory: /Users/zemian/Library/Caches/pip/wheels/9c/3b/73/8f16f45dc76999dafc2af06b0d6e1e669bc0e1594f41fcc2e8

Successfully built mysqlclient

Installing collected packages: mysqlclient

Successfully installed mysqlclient-1.3.6

(mypy-test)Zemians-Air:dev zemian$ python

Python 2.7.10 (default, Aug 22 2015, 20:33:39) 

[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.0.59.1)] on darwin

Type "help", "copyright", "credits" or "license" for more information.

>>> import MySQLdb

Traceback (most recent call last):

  File "<stdin>", line 1, in <module>

  File "/Users/zemian/dev/mypy-test/lib/python2.7/site-packages/MySQLdb/__init__.py", line 19, in <module>

    import _mysql

ImportError: dlopen(/Users/zemian/dev/mypy-test/lib/python2.7/site-packages/_mysql.so, 2): Library not loaded: libmysqlclient.18.dylib

  Referenced from: /Users/zemian/dev/mypy-test/lib/python2.7/site-packages/_mysql.so

  Reason: image not found
```

To resolve this, you need to add the following to your shell environment

`export DYLD_LIBRARY_PATH=/usr/local/mysql/lib`

Update 2016-06-17

To install mysqlclient on Ubuntu 14, you might need to first install the mysql_config first:

  `bash> sudo apt-get install libmysqlclient-dev`

