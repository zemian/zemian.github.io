Title: A command to remove all Windows mapped drives
Date: 2012-12-12 00:00:00-05:00
Tags: cmd



If you work in a Corp env and having a Laptop, you will likely go home
with it still running and it must has all the network drives still
mapped. And then later when you are at home and try to use your Laptop,
you will see considerable delay. The Windows Explore and many Windows
application that access File Browser dialog will try relentlessly in
reconnecting those drives without sucess. This also affect your Cygwin
shell too.

Here is a DOS command to remove them all.

    C:> net use * /delete /y

If you are in Cygwin bash, then you must quote the `'*'`.

