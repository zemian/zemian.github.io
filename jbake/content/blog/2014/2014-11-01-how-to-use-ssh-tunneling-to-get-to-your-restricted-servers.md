---
title: How to use SSH tunneling to get to your restricted servers
date: 2014-11-01
tags:
  - ssh
---
Have you ever been told that in your network serverX can only be reached by a serverY via SSH? Now you have access to serverY from your own PC with normal SSH access as well, but just not directly to serverX.

What can you do in situation like this if you need to access the restricted serverY? Well you can always ssh into serverY, then ssh again into serverX to check your work or log or whatever. But what happen if you have a database server or WebLogic Server instance running in serverX; and you want your local PC's fancy tools to access the serverX? (Eg: Accessing the WLS admin console, or using SqlDeveloper to connect to your DB etc). In this case, that's where ssh tunneling can help you, and here is how.

 1. Establish a connection to your serverY that you have access to from your PC. On top of that and at the same time, you will create a tunnel to serverX (your restricted server) by letting serverY redirect all the network traffic data back to your local PC on a specific port. Sounds scary, but it can be done with single command. For example this is how I can access the WLS Admin Console app that was running on the restricted server X. On your own PC, open a terminal and run the following:

bash> ssh -L 12345:serverX:7001 serverY

Above will prompt you to access serverY with your normal ssh credential that you have access to. Once logged in, you need to keep the terminal open. Now the tunnel is established and redirecting traffic from port 7001 (where the WLS admin console is running) on serverX to your own PC on port 12345 via the tunnel of server Y.

2. Open a browser on your own PC and type in address http://localhost:12345/console

Now you should able to access your restricted serverX's WLS admin console!

Same can be done with a database server such as MySQL. For example, you will run  ssh -L 12346:serverX:3306 serverY and then change your SqlDeveloper JDBC connection url string to the tunnel port jdbc:mysql://localhost:12346/mydb

This is a cool technique to get around a secured environment.