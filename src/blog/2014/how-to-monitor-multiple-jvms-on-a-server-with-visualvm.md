---
title: How to monitor multiple JVM's on a server with VisualVM
date: 2014-03-15T00:00:00-05:00
tags:
  - java
  - visualvm
---
In the [last article](http://saltnlight5.blogspot.com/2014/03/how-to-start-multiple-weblogic-managed.html) I have shown you how to start WebLogic Server with single admin and mulitiple managed servers. After those are started, how do you go check their health status? You can use the admin's /console webapp. But there  is also another tool that comes with all the default Oracle/Open JDK 6+: the VisualVM. I will show you how to get that up and running to monitor multiple JVM's.

On the server where you run your JVM servers, do this:

1. cd into $HOME and create a file named "jstatd.all.policy" with the following:
```
    grant codebase "file:${java.home}/../lib/tools.jar" {
       permission java.security.AllPermission;
    };
```

2. Run this command:

    `jstatd -J-Djava.security.policy=jstatd.all.policy &`

3. Now go back to your PC and open a terminal and run the following:

    `jvisualvm&`

4. Inside ViaualVM, add a Remote host of your server and you should see all the JVM that started there.

Here is an example of how it looks like:

![](/posts-images/2014/visualvm.png)
