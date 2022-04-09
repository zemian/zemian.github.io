---
title: Getting jboss-cli.sh to work on MacOSX
date: 2012-07-28T00:00:00-05:00
tags:
  - jboss
---
If you use MacOSX and JBossAS, then you might have encountered this problem when using the jboss-client.sh tool:

	$ bin/jboss-cli.sh 

You are disconnected at the moment. Type 'connect' to connect to the server or 'help' for the list of supported commands.

	[disconnected /] connect
	The controller is not available at localhost:9999

Or you will get this:

```
$ bin/jboss-cli.sh --connect
org.jboss.as.cli.CliInitializationException: Failed to connect to the controller
at org.jboss.as.cli.impl.CliLauncher.initCommandContext(CliLauncher.java:229)
at org.jboss.as.cli.impl.CliLauncher.main(CliLauncher.java:207)
at org.jboss.as.cli.CommandLineMain.main(CommandLineMain.java:34)
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke(Method.java:601)
at org.jboss.modules.Module.run(Module.java:260)
at org.jboss.modules.Main.main(Main.java:291)
Caused by: org.jboss.as.cli.CommandLineException: The controller is not available at localhost:9999
at org.jboss.as.cli.impl.CommandContextImpl.connectController(CommandContextImpl.java:639)
at org.jboss.as.cli.impl.CommandContextImpl.connectController(CommandContextImpl.java:613)
at org.jboss.as.cli.impl.CliLauncher.initCommandContext(CliLauncher.java:227)
... 8 more
```

It turns out this is bug on the JDK 1.7 that only appears on MacOSX JDK7! To be exact, I have the following: MacOSX 10.7.4 with JDK 1.7.0_05 and JBossAS 7.1.1.Final.

This problem has already been discovered by these posts:

[http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=7159361](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=7159361)

[https://community.jboss.org/message/750861#750861](https://community.jboss.org/message/750861#750861)

Except after ready through all, and I can't still get it to work because no one listed a clear steps by steps solution. So I re-summarize it again. You need to use that bug's report workaround solution on both the server and client!

Start the server: 

```
    $ bin/standalone.sh -Djava.nio.channels.spi.SelectorProvider=sun.nio.ch.KQueueSelectorProvider 
    ... 
    18:37:22,555 INFO  [org.jboss.as] (Controller Boot Thread) JBAS015874: JBoss AS 7.1.1.Final "Brontes" started in 1686ms - Started 133 of 208 services (74 services are passive or on-demand)
```

And on separate terminal, run the CLI:

```
    $JAVA_OPTS="-Djava.nio.channels.spi.SelectorProvider=sun.nio.ch.KQueueSelectorProvider" bin/jboss-cli.sh --connect 
    [standalone@localhost:9999 /] 
```

There, now we may continue to explore the cool JBossAS on the fancy OS.
