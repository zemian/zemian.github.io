title=Selectively checkout large project from SVN repository
date=2015-08-16
type=post
tags=svn
status=published
~~~~~~
Do you have a crazy large SVN repository that's just impractical to checkout the entire trunk? Or maybe you work on a large project that you only need few modules to do 
your work only, and don't need the 1 hour checkout time for the rest of the trunk files? Here is how 
you can do this with SVN command line.

    svn checkout --depth immediates http://myserver/svnrepo/myproject/trunk
    cd trunk
    svn update --depth infinity moduleA

    svn update --depth infinity moduleB

    svn update --depth infinity common/moduleX

    svn update --depth infinity common/moduleY

    svn update --depth empty lib/special
    svn update --depth infinity lib/special/jars