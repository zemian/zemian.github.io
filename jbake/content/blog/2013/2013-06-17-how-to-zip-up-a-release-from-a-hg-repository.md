title=How to zip up a release from a hg repository
date=2013-06-17
type=post
tags=hg
status=published
~~~~~~

## How to zip up a release from a hg repository

Did you know `hg archive` command can quickly zip up your project by given a revision or release
name? This is very handy to package up a distribution and share with other who is refusing to use
the same client.

I wrote a simple bash script to do this with couple extras. It will create a zip file with a nice
basename so it&#8217;s easy for unzipping. It also auto generate and append the given revision or tag
name into the RELEASE.txt file, so you know what&#8217;s been released.

Just add the following file into any root of your `hg` based project&#8217;s `bin` directory and it&#8217;s
ready to use.

Note

This script will not tag your repository. It assumed you already have tagged. It simply
will package up a release into a nice little zip file.

bin/zip-release.sh

    #!/usr/bin/env bash
    #
    # Package a release or snapshot from Hg repository for distribution.
    # :Author: Zemian Deng
    # :Date: 2013/02/01
    #
    # Usage example:
    #   # release a specific tag
    #   cd /path/to/project
    #   bin/zip-release.sh 1.0.1
    #
    #   # release a snapshot
    #   bin/zip-release.sh
    #
    
    # Command line arguments and options
    # Assume this script is in bin, which one directory up.
    APP_HOME=`cd $(dirname $0)/.. && pwd`
    if [[ `command -v realpath` != "" ]]; then
    	# resolve symbolic link if possible.
        APP_HOME=`realpath $APP_HOME`
    fi
    HG_REVISION=`hg id -i`
    REL_VERSION=$1
    if [[ "$REL_VERSION" == "" ]]; then
        REL_VERSION=$HG_REVISION
    fi
    REL_NAME="`basename $APP_HOME`-$REL_VERSION"
    REL_DIR=$APP_HOME/target/$REL_NAME
    REL_ZIPFILE=$REL_DIR/../$REL_NAME.zip
    
    # Generate the zip package
    printf "Generating $REL_NAME in directory=`pwd`\n"
    mkdir -p $REL_DIR
    hg archive -r $REL_VERSION $REL_ZIPFILE
    
    # Auto append revision id to release file.
    if [[ -e $APP_HOME/RELEASE.txt ]]; then
    	cp $APP_HOME/RELEASE.txt $REL_DIR/RELEASE.txt
    fi
    printf "$REL_NAME revsion=$HG_REVISION date=`date`\n" >> $REL_DIR/RELEASE.txt
    zip -u $REL_ZIPFILE $REL_DIR/RELEASE.txt
    
    # Clean up the tmp rel dir.
    rm -r $REL_DIR
    
    printf "$REL_ZIPFILE created.\n"

Last updated 2013-06-18 19:18:48 EDT