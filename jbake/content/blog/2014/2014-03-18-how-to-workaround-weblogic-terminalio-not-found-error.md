---
title: How to workaround WebLogic terminalio not found error
date: 2014-03-18
tags:
  - weblogic
---
In some PC environments, you may have encounter error like following when trying to create and start a WebLogic Server domain admin server 

<Mar 10, 2014 9:40:58 AM EDT> <Error> <Security> <BEA-090783> <Server is Running in Development Mode and Native Library(terminalio) to read the password securely from commandline is not found.><Mar 10, 2014 9:40:58 AM EDT> <Notice> <WebLogicServer> <BEA-000388> <JVM called WLS shutdown hook. The server will force shutdown now>
<Mar 10, 2014 9:40:58 AM EDT> <Notice> <WebLogicServer> <BEA-000365> <Server state changed to FORCE_SHUTTING_DOWN>

After this unfriendly message, your process will just exit and won't start at all! One quick fix for this is to try add this sys props -Dweblogic.management.allowPasswordEcho=true This will force the password prompt to echo out on console though, but at least it will start your server. And once the domain is created, you may restart it again without prompting password.

Ref: https://community.oracle.com/thread/934173