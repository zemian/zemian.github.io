title=Compling Apache HTTPD Web Server on Cygwin
date=2018-03-07
type=post
tags=httpd, cygwin
status=published
~~~~~~

I have noted the instructions on how to build the HTTPD web server from
scratch in a Cygwin platoform in a Windows 7 PC.

Note that compiling full HTTPD on Cygwin is very slow compare to other
system such as Linux or MacOSX! If you are looking to do full HTTPD
server development, it’s recommend to use a real Linux env instead.

Requirements:
=============

-   Apache HTTPD version 2.4.9

-   CYGWIN\_NT-6.1 L328BDS002096US 2.10.0(0.325/5/3) 2018-02-02 15:16
    x86\_64 Cygwin

-   Install the following cygwin packges:

        autoconf
        make
        automake
        m4
        gcc-core
        libtool
        bison
        flex
        perl
        libapr1-devel
        libaprutil1-devel
        libiconv-devel
        libpcre-devel
        libgdbm-devel
        openssl-devel

Compiling the server
====================

Step 1. Get the source:

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

Note that unlike the source pre-package you download from Apache site,
the `httpd` source repo does not have `configure` script, and you need
to generate it with `buildconf`. See next step for further instruction.

Note that the current `apr-util` repository is empty in master branch!
This is because they moved the code to `apr` starting version 2.0 dev,
but we still be using version 1.6.x, so we need to explicitly checkout
the tag or branch.

Step 2. Compiling

    ./buildconf
    ./configure --prefix=/usr/local/apache2 \
      --with-included-apr \
      --enable-mpms-shared \
      --with-mpm=worker \
      --enable-mods-shared=most
    make
    make install

The option `--prefix=/usr/local/apache2` tells the build to install the
software into a user specific location.

The option `enable-mpms-shared` will make the mpm\_module to be shared
library so you can switch to different threading model if you want.
Default to `worker` which should work nicely in Cygwin env.

The option `enable-mods-shared` will make most of the modules as shared
libraries. You can use `all` for full server.

The option `--with-included-apr` tells the build to use the `srclib/apr`
we have downloaded. Here you can use system installed `apr` if you like.
For an example:

    ./configure --prefix=/usr/local/apache2 \
    --with-apr=/usr/bin/apr-1-config \
    --with-apr-util=/usr/bin/apu-1-config \
    --enable-mpms-shared \
    --with-mpm=worker \
    --enable-mods-shared=most

For more details, see

-   <http://httpd.apache.org/docs/2.4/install.html> or the INSTALL file
    from source.

-   <https://httpd.apache.org/docs/2.4/programs/configure.html>
