---
title: Login to remote host without password
date: 2016-07-06
tags:
  - linux
  - ssh
---

Most of remote systems are secured by SSH, and to gain remote control with terminal, you would need to `ssh` into the server. You will be prompted to login with your password on every session. To avoid typing password everytime, you need to setup as authorized client. Here is how you can do that with ssh key.

First on your own client machine, generate the `$HOME/.ssh/id_rsa.pub` file:

    bash> ssh-keygen
    # When prompted to enter password, simply hit ENTER key to skip it!
    bash> cat  ~/.ssh/id_rsa.pub
    xxxyyyzzz zemian@myhost
    # You will see a very long string instead of "xxxyyyzzz".

Now you need to copy this public key string into your remote host. You need to `ssh` into the remote host with your valid password first to setup. If successful, the subsequent `ssh` into the remote host will not prompt you for password!

    bash> ssh myremotehost
    # Enter password to gain access

After you are in the remote host:

    myremotehost> vim ~/.ssh/authorized_keys
    #Paste and append the "xxxyyyzzz" into above file.

If you don&#8217;t already have the `~/.ssh/authorized_keys` file on remote host, then create it, but ensure you don&#8217;t let other users or groups to access it. Use command like this to change the permission:

    bash> chmod g-rw,o-rw ~/.ssh/authorized_keys

The cool thing about this is that it affects all `ssh` related commands, such as `scp` will now work without prompting you for password!

Have a productive day!