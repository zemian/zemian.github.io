title=How to switch Linux account user without the target user's password
date=2016-07-07
type=post
tags=linux
status=published
~~~~~~

Did you know if you have been granted `sudo` access to a remote
host with `su` command, then you may switch to any user without the
need to type in their password?

Try this out:

    zemian@myhost bash> sudo su - postgres
    # When prompted for password, enter your own user account password.
    
    # Now you are in as `postgres` user!
    postgres@myhost bash>
    

Or if you want to switch to the root user directly, simply try:

    bash> sudo su -
    

This is very useful when you need to switch to a user account that
was only setup just to run applications (eg: `postgres`, `mysql`,
`oracle`, or `weblogic` etc.) and not intented for real user. In this
case, you might not even know what the real password is. Above
trick should get you switch into that target user account.