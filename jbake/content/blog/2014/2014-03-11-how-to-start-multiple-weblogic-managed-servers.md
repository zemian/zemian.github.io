---
title: How to start multiple WebLogic managed servers
date: 2014-03-11
tags:
  - weblogic
---
The WebLogic Server docs recommand you to create a dedicated admin server and then sepearate managed servers for application deployment. Here I will show you how to create one or more managed server in the same host as the admin server.

I assume you already have WLS installed with your own domain created and running. If you haven't done this before, you may refer to my [previous blog on how to create and start WLS.](http://saltnlight5.blogspot.com/2014/01/getting-started-with-weblogic-server.html) After you started your domain (that's the default admin server), then follow these steps.

1. Login into your http://localhost:7001/console webapp.

2. On the right menu tree, click Environment > Servers. You should see "myserver(admin)" already listed.

3. Click "New" button, enter Server Name: appserver and set Server Listen Port: 7002

4. Click "Next" and then "Finish"

5. Now open a new terminal and run these commands: 
    cd mydomain
    bin/startManagedWeblogic.sh appserver1 localhost:7001

You would need to enter the username and password, same as for your /console webapp. After this managed server is up and running you may send the process in the background by pressing CTRL+Z and then run bg command. Or you may use the servers/appserver/security/boot.properties file to bypass the user/password prompt on every restart of this managed server.

Now you have one managed server started along with your admin server. After this you may start deploying application onto this managed server. All the webapp deployed would now accessable by its assigned port such as http://localhost:7002/yourwebapp url. You may repeat the same for however number of managed server you like to run on the same host. Try to name your server name and port number unique.