Title: Useful subversion commands
Date: 2015-07-02 00:00:00-05:00
Tags: svn


# shell alias and utilities for Subversion

function svnremovenew {
# svn st | grep '^?' | perl -ane 'print "$F[1]\n"' | xargs rm -rf {}
svn st | grep '^?' | perl -pe 's/\\/\//g' | perl -ane 'print "$F[1]\n"' | xargs rm -rf {}

}

function svnrevertmod {
svn revert `svn st | grep '^M' | perl -pe 's/\\/\//g' | perl -ane 'print "$F[1] "'`

}

alias svnrevertall='svn revert -R .'

alias svnup='svn update --accept mine-full'

alias svnupreset='svnup && svnrevertall && svnremovenew'

