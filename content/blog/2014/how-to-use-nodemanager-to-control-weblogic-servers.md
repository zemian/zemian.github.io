---
title: How to use NodeManager to control WebLogic Servers
date: 2014-03-21T00:00:00-05:00
tags:
  - weblogic
---
In my [previous post](https://zemian.github.io/2014/03/how-to-start-multiple-weblogic-managed.html), you have seen how we can start a WebLogic admin and multiple managed servers. One downside with that instruction is that those processes will start in foreground and the STDOUT are printed on terminal. If you intended to run these severs as background services, you might want to try the WebLogic node manager `wlscontrol.sh` tool. I will show you how you can get Node Manager started here.

The easiest way is still to create the domain directory with the admin server running temporary and then create all your servers through the /console application as described in last post. Once you have these created, then you may shut down all these processes and start it with Node Manager.

1. cd `$WL_HOME/server/bin && startNodeManager.sh &`
3. `$WL_HOME/common/bin/wlscontrol.sh -d mydomain -r $HOME/domains/mydomain -c -f startWebLogic.sh -s myserver START`
4. `$WL_HOME/common/bin/wlscontrol.sh -d mydomain -r $HOME/domains/mydomain  -c -f startManagedWebLogic.sh -s appserver1 START`

The first step above is to start and run your Node Manager. It is recommended you run this as full daemon service so even OS reboot can restart itself. But for this demo purpose, you can just run it and send to background. Using the Node Manager we can then start the admin in step 2, and then to start the managed server on step 3.

The NodeManager can start not only just the WebLogic server for you, but it can also monitor them and automatically restart them if they were terminated for any reasons. If you want to shutdown the server manually, you may use this command using Node Manager as well:

`$WL_HOME/common/bin/wlscontrol.sh -d mydomain -s appserver1 KILL`

The Node Manager can also be used to start servers remotely through SSH on multiple machines. Using this tool effectively can help managing your servers across your network. You may read more details here:

http://docs.oracle.com/cd/E23943_01/web.1111/e13740/toc.htm

TIPS1: If there is problem when starting server, you may wnat to look into the log files. One log file is the `<domain>/servers/<server>/logs/<server>.out` of the server you trying to start. Or you can look into the Node Manager log itself at `$WL_HOME/common/nodemanager/nodemanager.log`

TIPS2: You add startup JVM arguments to each server starting with Node Manager. You need to create a file under `<domain>/servers/<server>/data``/nodemanager/startup.properties` and add this key value pair: `Arguments = -Dmyapp=/foo/bar`

TIPS3: If you want to explore Windows version of NodeManager, you may want to start NodeManager without native library to save yourself some trouble. Try adding `NativeVersionEnabled=false` to `$WL_HOME/common/nodemanager/nodemanager.properties `
file. 
