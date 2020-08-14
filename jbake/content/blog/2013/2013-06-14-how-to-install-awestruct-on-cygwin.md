---
title: How to install awestruct on Cygwin
date: 2013-06-14
tags:
  - cygwin
---
How to install `awestruct` on Cygwin

## How to install `awestruct` on Cygwin

I tried installing `awestruct` on Cygwin today, but it failed with following:

    gem install awestruct
    Building native extensions.  This could take a while...
    ERROR:  Error installing awestruct:
            ERROR: Failed to build gem native extension.
    
            /usr/bin/ruby.exe extconf.rb
    checking for libxml/parser.h... *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of
    necessary libraries and/or headers.  Check the mkmf.log file for more
    details.  You may need configuration options.

I am running Windows 7 with Cygwin 1.7.20 and ruby 1.9.3p392

After looking at the log and googling around, I've found that the `awestruct` depends on `nokogiri`, and in
turns depends on `libxslt`, `libxslt` and `iconv` native lib. I have the last three
already installed in Cygwin with default paths, but the problem is they are installed
under `/usr` and not `/usr/local`. Because of this, I have to install the `awestruct`
with extra parameters like this:

    gem install awestruct -- --with-xml2-include=/usr/include/libxml2 \
                            --with-xml2-lib=/usr/lib \
                            --with-xslt-dir=/usr/include/libxslt \
                            --with-iconv-include=/usr/include \
                            --with-iconv-lib=/usr/lib

Now I am awestruct!

Last updated 2013-06-15 21:51:49 EDT