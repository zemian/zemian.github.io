Title: How to build Ruby on Cygwin and setup Heroku
Date: 2011-11-19 00:00:00-05:00
Tags: ruby,cygwin


I like to use ruby that comes with Cygwin instead of the RubyInstaller for Windows, because the path it handles are more consistenly in Linux form. But the current Cygwin only comes with `ruby-1.8.7`, so to use `ruby-1.9.3`, I have to built it on Cygwin on my own. And when building ruby from source on Cygwin, you would also have to install gem on your own as well. Turns out there are few issues that you have to fix too. Here are the steps I got it working:

0. Ensure you have the typical Cygwin/Linux build tools (gcc, make, autoconf, libiconv, openssl and etc.)

1. Download source for the following:

  a) LibYAML 0.1.4 from http://pyyaml.org/wiki/LibYAML

  b) ruby-1.9.3-p0 source from http://ruby-lang.org 

  c) rubygems-1.8.11 from http://rubygems.org 

2. Unzip/tar them all in /tmp

  a) 

  ```
  $ cd /tmp/yaml-0.1.4 

  $ ./configure && make && make install
  ```

  b) 

  ```
  $ cd /tmp/ruby-1.9.3-p0/ext/openssl
  $ ruby extconf.rb
  $ make && make install
  ```

  c)

  ```
  $ cd /tmp/ruby-1.9.3-p0
  $ export CPPFLAGS=-I/usr/local/include
  $ export LDFLAGS=-L/usr/local/lib     
  $ ./configure && make && make install
  ```

  e) 

  ```
  $ cd /tmp/rubygems-1.8.11
  $ ruby setup.rb
  ```

With these completed, you may now install Heroku client tool as ruby gem:

  c)

  ```
  $ gem install heroku
  ```

You would also need Git to successful push and deploy application to Heroku, but you can get Cygwin `git` package if you haven't already done so. 

NOTE: FYI, all the user built applications are usually install into `/usr/local` directory, while those system (comes with cygwin packages) are in `/usr`.

