title=Where did Git go?
date=2012-09-18
type=post
tags=git
status=published
~~~~~~
My git is gone after I upgraded to latest MacOSX updates! What a annoying thing.

Appearently it's in here now: `/usr/local/git/bin/git`

You can edit your `$PATH` like it says [here](http://stackoverflow.com/questions/6810059/git-on-mac-os-x-lion), or you could just relink it.

    
    ln -s /usr/local/git/bin/git /usr/local/bin/git
    