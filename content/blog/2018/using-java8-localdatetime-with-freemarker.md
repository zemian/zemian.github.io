Title: Using Java8 LocalDateTime with FreeMarker
Date: 2018-01-27 00:00:00-05:00
Tags: freemarker



It’s unfortunate that even latest FreeMarker 2.3.27 still does not
support `java.time.LocalDateTime` as data model natively. If you want to
use this in your template, you would either have to write your own, or
use this friendly library:

            <!-- Web View: FTL Template Engine -->
            <dependency>
                <groupId>org.freemarker</groupId>
                <artifactId>freemarker</artifactId>
                <version>2.3.27-incubating</version>
            </dependency>
            <dependency>
                <groupId>no.api.freemarker</groupId>
                <artifactId>freemarker-java8</artifactId>
                <version>1.1.5</version>
            </dependency>

With this, you may format the java8 date model in template like this:

    Today date is ${todayDate.format()}

    Or use custom date formatter: ${todayDate.format('yyyy-MM-dd HH:mm')}

