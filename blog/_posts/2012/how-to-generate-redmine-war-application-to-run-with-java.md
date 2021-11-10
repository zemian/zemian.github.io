---
title: How to generate Redmine WAR application to run with Java
date: 2012-08-06T00:00:00-05:00
tags:
  - jruby
  - redmine
  - issue-tracker
---

If you survey around Java open source land, it's really disappointing in not able to  find a decent project management web app that we can use. The Java war file deployment in an app server is easy to use, and it would give us good performance. Especially if we already in a Java shop, having a project management tool that deploys in an existing app server would be easier to maintain.

I have found the Ruby's [Redmine](http://www.redmine.org) to be a very good ONE-STOP-SHOP for most of your project development need. It has nice clean web interface, and the features are loaded: projects, users, issue tracking, wiki, source control viewer, documents, and it even has time tracking.

Altough the application is written in Ruby on Rails, you can run this with the JRuby perfectly fine on any Java app server. I've just done this and able to run it on JBossAS7.1.0 with jruby-1.6.7.2 and redmine-2.03.

For the impatients, you can actually grab my generated `redmine-2.0.3.war` from [my sandbox](https://bitbucket.org/saltnlight5/sandbox/downloads). I even provided an MySQL sql dump for you to get started without have to go through the building the war file. If you want to change the DB or any other settings, you can simply unpack the war file and edit the config files, then re-jar the war backup. This is still easier than building the war from scratch.

Here is how I build the war file. First step is setup a database. I picked MySQL.

    mysql> create database redmine character set utf8;
    mysql> create user 'redmine'@'localhost' identified by 'redmine123';
    mysql> grant all privileges on redmine.* to 'redmine'@'localhost';
    

Then prepare the Redmine with JRuby. Download the `redmine-2.0.3.zip` and unzip and then cd into this directory. Then run the following:

    $ $JRUBY_HOME/bin/gem install bundler
    $ $JRUBY_HOME/bin/bundle install --without development test rmagick postgresql sqlite
    $ cp config/database.yml.example config/database.yml
    $ # edit config/database.yml
    $ # type in your database connection info for "production" env.
    $ $JRUBY_HOME/bin/rake generate_secret_token
    $ RAILS_ENV=production $JRUBY_HOME/bin/rake db:migrate
    $ RAILS_ENV=production $JRUBY_HOME/bin/rake redmine:load_default_data
    

Now create the war file.

    $ $JRUBY_HOME/bin/gem install warbler
    $ $JRUBY_HOME/bin/warble config
    $ # edit config/warble.rb
    $ # replace: config.dirs = %w(app config lib log vendor tmp extra files)
    $ # add: config.gems += ["activerecord-jdbcmysql-adapter", "jruby-openssl", "i18n", "rack"]
    $ $JRUBY_HOME/bin/warble
    

After this, you will see `redmine-2.0.3.war` in the directory. Now you can drop it into any app server and you may kick start any projects!
