title=Setup Python on Mac
date=2015-10-10
type=post
tags=python, mac
status=published
~~~~~~

## 
Setup Python 2

The default MacOS should already come with latest Python 2.7. It will be pre-installed along with some pyobjc packages as well.

If you like to play around with python and external packages, it's best not to touch the original Python install from the System. Unfortunately, this Python 2.7 does not come with pip nor virtualenv packages to help setup separate environment! So it's okay to install these two into the system first. The easiest to setup is simply download get-pip.py from https://bootstrap.pypa.io/get-pip.py, then run

bash> sudo python get-pip.py

With this, you may now able install virtualenv

bash> sudo /usr/local/bin/pip install virtualenv

Now you can setup Python2 virtual env on a separate directory.

bash> python -m virtualenv mypy

bash> source mypy/bin/activate

(mypy) bash> python -c 'import sys; print sys.path'

You should able to verify the output above that you are indeed using your own setup of an isolated  Python2 env, and it even has your own pip installed list, so you won't mess up the built-in System version of python!

## 
Setup Python 3

The MacOS comes with latest Python 2.7, but no Python3. You can download the latest Python3 from python.org site and install it. It will give you a new 'python3' command so not to conflict with your existing Python. (NOTE: It's best not to remove or override the default Python2.7 that comes with the system!) But if you want to use 'python' command for Python3 for dev, then I suggest you create a new virtual environment of your own. The Python3 install should come with a 'pyvenv' command. For Example

bash> pyvenv mypy3
bash> source mypy3/bin/activate
(mypy3) bash> python -c 'import sys; print(sys.path)'