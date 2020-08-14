---
title: How to install venv and pip with a python 3.4 distribution
date: 2016-06-27
tags:
  - python
---
If you are unfortunate enough to have stuck with a Python 3.4 distribution and you want to setup a virtual env, then likely you will get the ensurepip module not found error:

bash> python3.4 -m venv mypy
Error: Command '['/home/zedeng/py-dev/mypy/bin/python3.4', '-Im', 'ensurepip', '--upgrade', '--default-pip']' returned non-zero exit status 1

I found someone posted a nice solution [1] to this. So first remove the dir first.
bash> rm -r mypy

Now do it again like this:
bash> python3.4 -m venv mypy --without-pip
bash> . mypy/bin/activate
 
mypy> wget https://bootstrap.pypa.io/get-pip.py
mypy> python get-pip.py 
mypy> pip list 

Now the problem is solved. I believe this problem is gone if you upgrade to Python 3.5

[1] http://www.thefourtheye.in/2014/12/Python-venv-problem-with-ensurepip-in-Ubuntu.html 