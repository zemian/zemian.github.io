title=IntelliJ highlight "out.println" in JSP as red error
date=2018-02-17
type=post
tags=intellij, jsp
status=published
~~~~~~

Some times you might have a Maven web application that deployes without
problem into a Tomcat server, but when open in IntelliJ IDE, you will
notice some of your JSP files have red error marks on lines such as
`out.println("test");`. This problem can occur if your project `pom.xml`
did not include `jsp-api` as provided dependency to your project! So
ensure it contains these in your `pom.xml` file.

            <!-- Web -->
            <dependency>
                <groupId>javax.servlet.jsp</groupId>
                <artifactId>javax.servlet.jsp-api</artifactId>
                <version>2.3.1</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>javax.servlet-api</artifactId>
                <version>3.1.0</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>jstl</artifactId>
                <version>1.2</version>
            </dependency>

Note that for Tomcat, you must include the `JSTL` tag library as
dependency, and it is NOT provided by server if you want to use the core
JSTL tags!
