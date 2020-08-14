---
title: How to make an executable WAR file
date: 2012-08-14
tags:
  - maven
---

If you ever used [Jenkin](http://jenkins-ci.org) CI server, you have probably seen their super easy one-line instruction to get started: `java -jar jenkins.war`. Now that's one awesome way to get your users to try out your product!

In this article, I will show you how to make a WAR file self executable just like above. Before I do that, let me tell you a little web app that I made, and then I will show how I converted it into runnable `war`.

## The Requirement: Taking Notes Efficiently

I tend take a lot of notes when I do my work. Instead of using the crapy Windows Notepad.exe, I would setup my cygwin `.bash_profile` like this:

    function e() { /cygdrive/C/apps/notepad++.exe $(cygpath -w "$@") ; }
    function n() { F="$HOME/notes/$(date "+%Y%m%d-%H%M%S").markdown"; touch $F; e $F; }
    

I happen to have [Notepad++](http://notepad-plus-plus.org) installed, but you can use just about any text editor you like. With that setup, then anywhere in my terminal I can simply type `n` to have a GUI editor pop open, and I will have my note file ready to record notes. The file name would have a timestamp date, and I like to record them with simple `Markdown` syntax for easy viewing later. Since I write them in plain text, it's easy and fast to search using `grep MYSTUFF ~/notes/*`. Once I found it, I can quickly edit it by `e ~/notes/20120814-000000.markdown`.

This method of taking notes is fast and portable between my Linux and Windows systems (well, I have to choose a different editor between OS but not big deal). Now since I already recorded my notes in markdown, there is no way I can see the pretty result unless I use an [online converter](http://daringfireball.net/projects/markdown/dingus). So I thought it would be awesome if I can have a web app that let me record these notes, and yet give me a nice quick `Markdown` to html view.

## Introducing the webnotepad.war

To improve my notes taking, I created little web app called [webnotepad.war](https://bitbucket.org/saltnlight5/sandbox/downloads). It's really simply one page web app that record notes in Markdown syntax, preview it, and allow you to search it. It also let you edit old notes too. The whole thing is just a Servlet class, and it doesn't even use JSP.

However, after I have this little web app, it bothers me that I would always need an app server to run it. (I can run `mvn tomcat7:run` directly from my source project, but it would require me be online to satisfy initial Maven build.) So here is a perfectly example use case that would be super nice to make this war file self executable. In fact I have succeeded in this little experiement. You can download it and try it out yourself with `java -jar webnotepad.war`, and then browse `http://localhost:8080`. If you get port conflict, try `--httpPort=8081`. 

Of course you continue to deploy `webnotepad.war` into any app server too.

## Making war file executable

Before you want to make war executable, you want to build and package your normal web application first. The trick to make the war file runnable is that you want additionally add a Main-Class in the `META-INF/MANIFEST.MF` in the war file. And from this we need to load and run an embedded Servlet server with the self war file deployed. I noticed Jenkins uses one called [Winstone](winstone.sourceforge.net) container server. I was amazed to find that this server only has 300K in size! It support full Servlet 2.5 spec! It can optionally support JSP with Jasper which will cost you up to 3MB in size. That's still a very small price to pay compare to any Servlet container out there!

Making a Main-Class [WinstoneMain.java](https://bitbucket.org/saltnlight5/sandbox/src/4e80e4b4114e/webnotepad/src/main/winstone/WinstoneMain.java) is not hard. However making Maven to package everything is pretty tricky. Now my `webnotepad.war` doesn't need Jasper, but if you do, you specially want these jars outside of `WEB-INF/lib` because you don't want your normal app server to load these! Else you will get very odd errors. 

In my example I added into `WEB-INF/lib-winstone`, and then the `WinstoneMain` would extract these and then load the `winstone.Launcher` using a custom class loader. Also, we need to use some Winstone options to start a web server properly. I use this [webnotepad/pom.xml](https://bitbucket.org/saltnlight5/sandbox/src/4e80e4b4114e/webnotepad/pom.xml) to package it all up the war file. You can easily use my example because I have create them under a separate `profile` and you just need add to your web module/pom.xml. In my project demo you would run `mvn package -Pdist` to generate the executable war file.

NOTE: I noticed Winstone project didn't show much activity since last release since 2008. But I was happy to find that there is a fork project on [GoogleCode Winstone](http://code.google.com/p/winstone/) that shows activities. I didn't use this for my demo, but it looks promising.