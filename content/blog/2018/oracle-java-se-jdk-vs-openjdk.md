Title: Oracle Java SE JDK vs OpenJDK
Date: 2018-03-24 00:00:00-05:00
Tags: openjdk,jdk,java



In general:

-   JRE - Java Runtime Environment. It comes with the Java (`java`)
    executable for running Java application. This is typical for end
    users who use it to run compiled Java applications (in jar file
    distribution), and not doing any development. JRE is smaller to
    download than JDK.

-   JDK - Java Development Kit. It comes with Java compiler (`javac`)
    and many other development tools; and it also include the JRE as
    well. This is for Java development and running Java applications
    together. As a developer, you usually want to get this as single
    package.

Oracle sponsors and drives the official open source
[OpenJDK](http://jdk.java.net/) project, where new Java edition are
develope. It provides binary releases that developers may download for
various OS envs. (Note starting JDK9, you may download binary package
that simply untar/unzip into a directory without need of installer!)

Oracle also provides commercial version of the [Java SE
JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
These JDK packages has different licenses for usage, and are built with
different installer format. Users usually require local Admin Rights to
install it.

