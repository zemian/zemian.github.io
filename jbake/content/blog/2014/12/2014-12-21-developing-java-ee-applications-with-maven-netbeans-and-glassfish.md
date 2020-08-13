title=Developing Java EE applications with Maven, NetBeans and Glassfish
date=2014-12-21
type=post
tags=javaee, maven
status=published
~~~~~~
I have been working with EE 6 stack lately, and I find it quite pleasant and productive. For my own learning purpose, I intend to explore more deeper on some of the major components available on the EE stack.

I have started a [java-ee6-examples](https://github.com/saltnlight5/java-ee6-examples) project in GitHub, and I plan to add my examples and working demo code there, along with some blog posts whenever I can. The project is seperated into sub-modules that a typical EE application would organized: a parent module, a common library jar module and one or more web modules etc. The project is buildable using [Maven 3 tool](http://maven.apache.org/) on command line, and you may use any major IDE that supports Maven (I will try out NetBeans for these demos).

I will also be testing my examples application mainly on Glassfish Server. Glassfish Server is an open source EE application server, and 
its current 4.x release supports EE 7 already (GF 3.x is for EE 6). We should able to run
 any EE 6 applications on GF 4.x without much problems, so for my learning purpose, I will restrict my examples to use EE 6 for now (you will notice that I have to set EE 6 version as dependency in Maven pom file!)

So if you are interested in these, watch this blog for future updates.

To help you started with EE development, I jot down few useful links here.

Downloads: 
[JDK 7](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html)
[NetBeans IDE](https://netbeans.org/downloads/)
[Glassfish Application Server ](https://glassfish.java.net/download.html)

(Oracle also provides [convenient package download](http://www.oracle.com/technetwork/java/javaee/downloads/index.html) that includes all 3 above[http://www.oracle.com/technetwork/java/javaee/downloads/index.html](http://www.oracle.com/technetwork/java/javaee/downloads/index.html)!)

References:
[EE 6 Tutorial](https://docs.oracle.com/javaee/6/tutorial/doc/)
[EE 6 Technologies](http://www.oracle.com/technetwork/java/javaee/tech/javaee6technologies-1955512.html)
[EE 6 API](http://docs.oracle.com/javaee/6/api/)
[JDK 7 API](http://docs.oracle.com/javase/7/docs/api/)