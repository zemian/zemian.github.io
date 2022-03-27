Title: Getting started with Intellij IDEA and WebLogic Server
Date: 2014-01-31 00:00:00-05:00
Tags: intellij,weblogic


Before starting, you would need the Ultimate version of IDEA to run WebLogic Server (yes, the paid version or the 30 days trial). The Community edition of IDEA will not support Application Server deployment.

I also assume you have already setup WebLogic Server and a user domain as per my [previous blog instructions](https://zemian.github.io/2014/01/getting-started-with-weblogic-server.html). So now let's setup the IDE to boost your development.

1. Create a simple HelloWorld web application in IDEA.
2. For your HelloWorld, you can go into the Project Settings > Artifacts, and add "web:war exploded" entry for your application. You will add this into your app server later.
3. Ensure you have added the Application Server Views plugin with WebLogic Server. (It's under Settings > IDE Settings > Application Server)

1. Click + and enter Name: WebLogic 12.1.2 
2. WebLogic Home: `C:\apps\wls12120`

4. Back to your editor, select Menu: Run > Edit Configuration

1. Click + and add "WebLogic Server" > Local
2. Name: WLS
3. On Server tab, ensure DomainPath is set: `C:\apps\wls12120\mydomain `
4. On Deployment tab, select "web:war exploded" for your HelloWorld project.
5. Click OK

5. Now Menu: Run > "Run WLS"

Your WebLogic Server should now start and running your web application inside. You may visit the browser on http://localhost:7001/web_war_exploded

Some goodies with Intellij IDEA and WLS are:

- Redeploy WAR only without restarting server
- Deploy application in exploded mode and have IDE auto make and sync 
- Debug application with server running within IDE
- Full control on server settings 

NOTE: As noted in previous blog, if you do not set MW_HOME as system variable, then you must add this in IDEA's Run Configuration. Or you edit your "mydomain/bin/startWebLogic.cmd" and "stopWebLogic.cmd" scripts directly. 

