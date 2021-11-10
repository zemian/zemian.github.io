---
title: How to create WebLogic Persistent JDBCStore
date: 2014-03-26T00:00:00-05:00
tags:
  - weblogic
---
The WebLogic uses "Persistent Store " to store subsystems data, such as persistent JMS messages. It defaults to use File Store, but you can customize to use database instead. To do this, you would need to create a DataSource first, and ensure to UNCHECK the "Supports Global Transactions" feature. Basically you need to create an NON-XA DataSource in order to use it in Persistent JDBCStore. Otherwise you will not able to see your datasource as option to use.

Exmaple of a Non-XA DataSource:
![](/images/posts/2014/wls-datasource.png)

Exmaple of JDBCStore using that Non-XA DataSource: 
![](/images/posts/2014/wls-datasource-jdbcstore.png)
