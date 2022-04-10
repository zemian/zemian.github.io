---
title: How to manually test a DataSource connection in WebLogic
date: 2016-06-16T00:00:00-05:00
tags:
  - weblogic
---

When you creating new DataSource in WLS, it allows you to test the
connectivity. However after you have created it, the test button is
kinda hidden in a non-obvious way. This is how I get to it and test an
existing DataSource that have targeted a server.

1.  Login to Admin Console (eg: <http://localhost:7100/console>)

2.  On the Domain Structure left panel, click:    
    `<my\_domain\_name>` (eg: DefaultDomain) &gt; Services &gt; Data
    Sources

3.  On the right, Click on the DataSource name you want to test.

4.  Click the "Monitoring" tab &gt; "Testing" tab.

5.  Select the server the DataSource has targeted to and then press
    "Test Data Source" button.
