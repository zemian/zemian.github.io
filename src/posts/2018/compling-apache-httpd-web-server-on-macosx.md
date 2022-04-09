---
title: Compling Apache HTTPD Web Server on MacOSX
date: 2018-03-07T00:00:00-05:00
tags:
  - macosx
  - httpd
---

Before you begin, you should know that the HTTPD server is very likely
already comes with your MacOSX! For example, here is how my server looks
like:

    $ apachectl -t -D DUMP_INCLUDES
    Included configuration files:
      (*) /private/etc/apache2/httpd.conf
        (498) /private/etc/apache2/extra/httpd-mpm.conf
        (504) /private/etc/apache2/extra/httpd-autoindex.conf
        (544) /private/etc/apache2/other/php7.conf

You would want to compile and buid your own HTTPD server if you like to
customize your own build or doing modules development. In that case,
read on.

    #
    # Requirement:
    #  MacOSX Version:
    #    Darwin myhost 17.4.0 Darwin Kernel Version 17.4.0: Sun Dec 17 09:19:54 PST 2017; root:xnu-4570.41.2~1/RELEASE_X86_64 x86_64
    #  HTTPD version 2.4.9
    #

    # Install xcode that comes with C compiler
    xcode-select --install

    # Install package manager for macosx
    # install brew from https://brew.sh

    #
    # NOTE: If your brew installation have probblem with error writing to /usr/local
    # then try to uninstall then install brew again.
    #
    # Uninstall
    # /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
    #
    # Install
    # /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    #

    # Install make tools and required libraries
    brew install autoconf automake libtool pcre

    git clone git://git.apache.org/httpd.git
    cd httpd
    git checkout 2.4.9

    # You also need to get the required library sources
    cd srclib
    git clone git://git.apache.org/apr.git
    cd apr
    git checkout 1.6.3
    cd ../
    git clone git://git.apache.org/apr-util.git
    cd apr-util
    git checkout 1.6.1
    cd ../../

    ./buildconf
    ./configure

    make
    sudo make install

    # When completed successful, the HTTPD server will be in /usr/local/apache2
