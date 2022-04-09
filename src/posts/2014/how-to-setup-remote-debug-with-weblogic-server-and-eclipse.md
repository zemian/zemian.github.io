---
title: How to setup remote debug with WebLogic Server and Eclipse
date: 2014-04-07T00:00:00-05:00
tags:
  - weblogic
---
Here is how I enable remote debugging with WebLogic Server (11g) and Eclipse IDE. (Actually the java option is for any JVM, just the instruction here is WLS specific.) 

1. Edit `<my_domain>/bin/setDomainEnv.sh` file and add this on top:

`JAVA_OPTIONS="$JAVA_OPTIONS -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n" 
`
The `suspend=n` will start your server without wait for you to connect with IDE. Server usually started with bunch of waiting threads and you can connect with an IDE any any time. You then try to place a break point and fetch a new HTTP request etc to initiate a thread to go into the code breakponit. If you don't want the WLS to wait before fully started, then set it to suspend=y instead.

2. Start/restart your WLS with `<my_domain>/bin/startWebLogic.sh`

3. Once WLS is running, you may connect to it using Eclipse IDE. Go to Menu: Run > Debug Configuration ... > Remote Java Application and create a new entry. Ensure your port number is matching to what you used above. 

Read more java debugging option here: [http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html#DebuggingOptions](http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html#DebuggingOptions)

Now on the IDE Eclipse side, you can connect to your WLS server with the following instruction:

1. In Eclipse menu, select Run > Debug Configuration ... 

2. On left side, select Remote Java Application, and then press the + button to create a new configuration.

3. On the right side you can fill in the server info such as hostname and port number.

4. Click Debug button

UPDATE (10/30/14):

Remember each remote debug setup is per JVM and requires a unique port. So how to set each WebLogic Managed Server with unique debug port? You can easily do this by updating your line above to this:
```
DEBUG_PORT=${DEBUG_PORT:=8000}
JAVA_OPTIONS="$JAVA_OPTIONS -Xrunjdwp:transport=dt_socket,address=$DEBUG_PORT,server=y,suspend=n" 
```
Now you can start managed server like this to change the port in a Bash shell by change to your domain directory first, then run:
```
bash>DEBUG_PORT=8001 bin/startManagedWeblogic.sh my_server_name
```
