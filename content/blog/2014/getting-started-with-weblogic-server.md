Title: Getting started with WebLogic Server
Date: 2014-01-30 00:00:00-05:00
Tags: weblogic



Here are some quick tips on how to get started with WebLogic Server on Windows OS:

1. Download wls1212.zip from http://www.oracle.com/technetwork/middleware/weblogic/downloads/index.html
2. Unzip it under `C:\apps\wls12120`
3. `set MW_HOME=C:\apps\wls12120`
4. `set JAVA_HOME=C:\apps\jdk1.7.0_51`
5. `cd C:\apps\wls12120`
6. `configure.cmd`
7. `mkdir user_projects\domains\mydomain`
8. `cd user_projects\domains\mydomain`
9. `%JAVA_HOME%\bin\java -Xmx1024m -XX:MaxPermSize=256m weblogic.Server`

By default, the last step should create a domain with all the nessary files in your current working directory. It will also prompt you to create a config.xml (enter 'y' to continue) and then prompting for a username and password to manage the server. Optionally you may also setup username/password part by using additional sys props like this:
`-Dweblogic.management.username=weblogic -Dweblogic.management.password=Welcome1` 

Use CTRL+C to stop the server. The next time you start, you can just invoke "mydomain\bin\startWebLogic.cmd"

TIPS1: If you omit `-Xmx1024m -XX:MaxPermSize=256m` you will likely can start the server but as soon as you activate the /console webapp, you will run into out of memory issue.

TIPS2: If you have access, try to add Windows Environment variables for `MW_HOME` and `JAVA_HOME` into your system. If not, then you can easily add it into "`mydomain\bin\setDomainEnv.cmd`" as well (it's generated so you can edit all you like.) Without these two variables, you will likely get a class not found error.

TIPS3: The default server name created by this initial setup is called myserver. If you like to name it something else, then add sys props such as this: `-Dweblogic.Name=admin-server `

TIPS4: To change the domain name from `mydomain` to something else, use: `-Dweblogic.Domain=dev-domain`

TIPS5: The default admin server listening port is 7001. To change this, use: -Dweblogic.ListenPort=7002

