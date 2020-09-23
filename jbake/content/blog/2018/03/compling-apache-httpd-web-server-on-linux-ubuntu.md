title=Compling Apache HTTPD Web Server on Linux (Ubuntu)
date=2018-03-07
type=post
tags=httpd, linux
status=published
~~~~~~

    sudo apt install autoconf automake libtool libtool-bin libpcre3-dev libexpat1-dev libexpat1-dev libexpat1-dev
    mkdir ossdev
    cd ossdev
    git clone git://git.apache.org/httpd.git
    git clone git://git.apache.org/apr.git httpd/srclib/apr
    git clone git://git.apache.org/apr-util.git httpd/srclib/apr-util
    cd httpd
    git checkout 2.4.9
    cd srclib/apr
    git checkout 1.6.3
    cd ../apr-util
    git checkout 1.6.1
    cd ../../
    ./buildconf
    ./configure --enable-mpms-shared --with-pmp=worker --enable-mods-shared=most
    make
    sudo make install
    sudo /usr/local/apache2/bin/apachectl -k start
