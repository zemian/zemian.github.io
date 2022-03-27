Title: Getting Django setup on Windows
Date: 2014-06-18 00:00:00-05:00
Tags: python,django


A friend asked me how to setup an Django enviroment on Windows without the Cygwin fuzz. Here is the shortest steps I can think of:

1. Install Python3.4 as default path. (It should be "C:\Python34").

2. Open cmd.exe program on Windows and run the following commands:
```
    set PATH=%PATH%;C:\Python34;C:\Python34\Scripts
    pip install django
    python C:\Python34\Lib\site-packages\django\bin\django-admin.py startproject mysite
    cd mysite
    python manage.py syncdb
    (Follow prompts to setup an initial db. remember the user you used here.)
    python manage.py runserver
```
3. You are ready to django! Open your browser http://127.0.0.1:8000 to verify.

    Or login into http://127.0.0.1:8000/admin with the user you setup above.

   

What's next?

Explore django with a guided tutorial here: 

[https://docs.djangoproject.com/en/1.6/intro/tutorial01](https://docs.djangoproject.com/en/1.6/intro/tutorial01)


