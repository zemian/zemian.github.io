---
title: Script Console Tool for any WAR application
date: 2012-07-21T00:00:00-05:00
tags:
  - java
  - script
---

In the latest release of [TimeMachine scheduler project](https://bitbucket.org/timemachine/scheduler), I've added a Groovy scripting console to the web app and allow user to script the scheduler. This feature is actually very useful for any servlet application as well. Imagine that if you have a script/shell console for your web application that allow you to dynamically inspect any variables or data?

With the same idea, I've written a very basic JSP file `script-console.jsp` that provides a great ad hoc tool. For simplicity sake, I put everything into single file. All you need is just add this one file into your java webapp root directory, and you'll have an instant scripting console shell! (Yes, I am aware having code in JSP is bad, but having everything in one page is convenient, specially if you plan to just use this as one time inspection.)

The JSP will automatically detect all the scripting engine available in your JVM (1.6+) and let you choose any one to use. In the text area you can enter any script codes. All the JSP implicit variables are available for you to use as well. JVM 1.6 or higher will have at least JavaScript engine available, so you can use it immediately.

Be aware that this is a huge security risk since the script console not only expose your application, it also expose your entire JVM! It must be use with care, and if possible, it needs to be added as protected resources in your web application.
