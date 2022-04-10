---
title: How to secure a web application by the app server container
date: 2014-12-01T00:00:00-05:00
tags:
  - security
---
There are many benefits to allow a container in managing users, groups and authentication policies. You may configure your WAR application to take advantage of this by adding the following in the WEB-INF/web.xml file
```
   <security-constraint>
        <web-resource-collection>
            <web-resource-name>webuser</web-resource-name>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>webuser</role-name> 
        </auth-constraint>
    </security-constraint>
    <login-config>
        <auth-method>BASIC</auth-method>
        <realm-name>default</realm-name>
    </login-config>
    <security-role>
        <role-name>webuser</role-name>
    </security-role>
```
Above will secure the entire application and allow only users with "webuser" role to access it. The name "webuser" can be any name you want.

Each app server will manage users differently. In the case of WLS, it lets you create "user" and "user group", and then you can map the defined role above to the group. To do this, add the following to the  WEB-INF/weblogic.xml file.
```
<weblogic-web-app 
    xmlns="http://xmlns.oracle.com/weblogic/weblogic-web-app" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://xmlns.oracle.com/weblogic/weblogic-web-app 
        http://xmlns.oracle.com/weblogic/weblogic-web-app/1.2/weblogic-web-app.xsd">
    <security-role-assignment>
        <role-name>webuser</role-name>
        <principal-name>webusergroup</principal-name>
    </security-role-assignment>
</weblogic-web-app>
```
Here we tell WLS that we map the "webuser" role defined in web.xml to use the "webusergroup", a WLS user group.

To create  user or user group in WLS, you may use the WLS Admin console web application. Go to the Security Realm and select the default "myrealm", and then select User or Group tab. Go ahead and add a user with password under a new group named "webusergroup". After this you can deploy your app, and it would prompt you for user and password whenever you try to access its URL.

You can find out more security info at [https://docs.oracle.com/cd/E23943_01/web.1111/e13711/thin_client.htm#SCPRG171](https://docs.oracle.com/cd/E23943_01/web.1111/e13711/thin_client.htm#SCPRG171). 
