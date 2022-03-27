Title: The Apache Camel 2.12.0 has been released!
Date: 2013-09-10 00:00:00-05:00
Tags: camel



The Apache Camel 2.12.0 has been released! Yeh!

This is a special release to me mainly because I have help fixed few   [Jira Issues](https://issues.apache.org/jira/issues/?jql=project%20%3D%20CAMEL%20AND%20status%20in%20(Resolved%2C%20Closed)%20AND%20text%20~%20%22Zemian%22). :-P

Among these, I have helped ported the old `quartz` component into [quartz2](http://camel.apache.org/quartz2.html) using the new Quartz 2.0 API. As far as for Camel users concern, it should work just as old one, except it will now use the `quartz2://` URL prefix instead. But the implementation uses Quartz2 library that's not backward compatible with old Quartz1.8, which is very old. In addition, the `quartz2` component now has a new option `deleteJob=false` that will allow you to NOT delete the job created by Camel on shutdown, and it will also reuse existing job found with the same name in the Quartz scheduler if it exists during startup.

Obviously my contribution seems tiny compare to what the [full release](http://camel.apache.org/camel-2120-release.html) brings you, but it&#8217;s a start in helping out the project. I am glad the Camel folks accepted these patches and found it into their release.

Try out the latest Camel and see what you think.

Happing programming!

