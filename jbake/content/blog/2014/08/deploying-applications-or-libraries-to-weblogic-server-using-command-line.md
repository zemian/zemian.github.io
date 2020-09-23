title=Deploying applications or libraries to WebLogic Server using command line
date=2014-08-20
type=post
tags=weblogic
status=published
~~~~~~
Here is how you can automate deployment for WebLogic server using command line.

First source the env settings from the server:
$ source $ML_HOME/server/bin/setWLSEnv.sh

Deploy Library:
$ java weblogic.Deployer -nostage -deploy -library \
-adminurl localhost:7001 \
-username weblogic -password my_secret \
-targets myserver \
my_shared_lib.war 

Deploy Application:
$ java weblogic.Deployer -nostage -deploy \
-adminurl localhost:7001 \
-username weblogic -password my_secret \
-targets myserver \
-name myapp.war myapp.war

For development, you likely want to use the "-nostage" meaning to deploy the app or library directly from the file system. This means any changes to that file location and a reload from WLS will take effect immediately. 

For undeploy the command line options are same for library or app but with matching name.
$ java weblogic.Deployer -undeploy \
-adminurl localhost:7001 \
-username weblogic -password my_secret \
-targets myserver \
-name myapp_or_lib.war