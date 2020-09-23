---
title: Adding new cacert entry into AdoptOpenJDK
date: 2018-07-23T00:00:00-05:00
tags:
  - cacert
  - keytool
  - openjdk
---

I downloaded latest Tomcat source and it failed to get the dependencies.

      cd src/github/tomcat
      ant download-test-compile
            [get] Error getting https://repo.maven.apache.org/maven2/junit/junit/4.12/junit-4.12.jar to C:\Users\zemian\tomcat-build-libs\download-2000731528.tmp

    BUILD FAILED
    C:\Users\zemian\src\github\tomcat\build.xml:2705: The following error occurred while executing this line:
    C:\Users\zemian\src\github\tomcat\build.xml:3051: javax.net.ssl.SSLException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
            at sun.security.ssl.Alerts.getSSLException(Alerts.java:208)

It turns out this error is caused by the OpenJDK 8 that I am using. The
one I got is from <https://adoptopenjdk.net/>, and the
$JAVA\_HOME/jre/lib/security/cacert file has no entries for trusted CA
certs!

So I found few solutions:

1.  Find a copy of OracleJDK and copy their `cacerts` over.

2.  If you are on Linux, you can try installing cacerts using tools the
    OS provided. (eg: Ubuntu can be done like here:
    <https://stackoverflow.com/questions/6784463/error-trustanchors-parameter-must-be-non-empty>)

3.  Upgrade OpenJDK to 10

4.  Or the quick way, go to the site that gives you problem, export
    their cert using the browser, and then import into to the `cacerts`
    file.

So for me, I went to <https://repo.maven.apache.org/> and exported
`repomavenapacheorg.crt`, and then I ran the following:

    cd $JAVA_HOME/jre/lib/security
    keytool -keystore cacerts -storepasswd changeit -importcert -file 'Downloads/repomavenapacheorg.crt' -trustcacerts
    keytool -keystore cacerts -storepasswd changeit -list

This fixed my problem.
