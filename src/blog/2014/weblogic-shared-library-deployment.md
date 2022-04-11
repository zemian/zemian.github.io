---
title: WebLogic shared library deployment
date: 2014-08-19T00:00:00-05:00
tags:
  - weblogic
---
When deploying a large WAR file application, it would be more easier to manage if we can separate the dependency jars away from the rest of the Web content; or at least those third party jars that do not update often. In this case, we usually call the jars content a "Shared Library" and the Web content the "Skinny WAR".

With WebLogic Server, you can easily deploy such two artifacts. Just seperate and package your WAR application into two. The share library would be simply another WAR with only the WEB-INF/lib content in it, while the Skinny war will be the rest of your application without the jar depependencies. On the shared lib WAR file, ensure you have an META-INF/MANIFEST.MF that specify the name and version like the following:

Implementation-Title: my_shared_lib
Implementation-Version: 1.0
Specification-Title: my_shared_lib
Specification-Version: 1.0
Extension-Name: my_shared_lib-1.0

Now your Skinny WAR would need to add an WEB-INF/weblogic.xml extension file to reference the library like this:

<weblogic-web-app> 
    <library-ref>
        <library-name>my_shared_lib</library-name>
        <specification-version>1.0</specification-version>
        <implementation-version>1.0</implementation-version>
        <exact-match>true</exact-match>
    </library-ref>
</weblogic-web-app>

With these two packaged, now turn to your WLS admin console, you will find "Deployments" menu link on left, and on right, you click "Install" button. The next screen will prompt you to choose which type of deployment to install: "Library" (Shared Lib War) or "Application" (Skinny War). Re-run this twice, each with your two seperated WAR files you just built. 

![](/posts-images/2014/wls-shared-lib.png)

The WLS will combine the two when running your WAR application. This comes handy if you are to deploy multiple instances of your Skinny war application, but now you only need one shared lib.

NOTE: Ensure you select at least one, and the same Target servers where you deploy the Library and Application. Else your application will not be deployed and run.
