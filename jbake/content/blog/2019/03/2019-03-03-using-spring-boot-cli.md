title=Using Spring Boot Cli
date=2019-03-03
type=post
tags=spring-boot, groovy
status=published
~~~~~~

The easiest way to get started with Spring is to setup SpringBoot with
their CLI tool. You can bootstrap a web application with a single Groovy
script!

Download the CLI from
<https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-installing-the-cli>

Now unzip and setup PATH to use the `spring` command.

    unzip spring-boot-cli-2.0.5.RELEASE-bin.zip
    export PATH=`pwd`/spring-2.0.5.RELEASE/bin:$PATH

Create a simple groovy app script

    // file: app.groovy
    @RestController
    class HelloApp {
        @RequestMapping("/")
        String home() {
            return "Hello World!"
        }
    }

Now run it and test it with a browser:

    spring run app.groovy
    open http://localhost:8080

Or you can create a full SpringBoot project with Maven build:

    # Or create a new project
    spring init -d=web -x --package-name zemian.springbootstarter.hello hello-spring-boot
    cd hello-spring-boot
    ./mvnw spring-boot:run
    open http://localhost:8080

You can learn more from my starter project:
<https://github.com/zemian/spring-boot-starter>
