Title: Writing your own logging service?
Date: 2014-12-13 00:00:00-05:00
Tags: logging


Application logging is one those things like favorite Editors war: everyone has their own opinions and there are endless of implemenations and flavors out there. Now a days, you likely would want to use something already available such as Log4j or Logback. Even JDK has a built in "java.util.logging" implementation. To avoid couple to a direct logger, many projects would opt to use a facade interface, and there is already couple good ones out there already, such as SLF4J or Apache Common Logging etc.

Despite all these, many project owners still want to try write their own logger service! I wondered if I were to ask and write one myself, what would it be like? So I played around and come up with this simple facade that wraps one of the logger provider (JDK logger in this case), and you can check it out [here](https://github.com/saltnlight5/java-ee6-examples/tree/master/common-service/src/main/java/zemian/service/logging). With my logger, you can use it like this in your application:
```
 import zemian.service.logging.*;
 class MyService {
   static Log LOG = LogFactory.createLog(MyService.class);
   public void run() {
     LOG.info(Message.msg("%s service is running now.", this));
   }
 }
```
Or you can use the Logger wrapper to avoid many imports:
```
 import zemian.service.logging.Logger;
 class MyService2 {
   static Logger LOGGER = new Logger(MyService2.class);
   public void run() {
     LOGGER.info("%s service is running now.", this);
   }
 }
```
Some principles I followed when trying this out:

- Use simple names for different level of messages: error, warn, info, debug and trace (no crazy fine, finer and finest level names.)
- Seperate Log service from implementation so you can swap provider.
- Uses Message logging POJO as data encapsulation. It simplifies the log service interface.
- Use log parameters and lazy format binding to construct log message to speed performance. 

Do not go crazy with logging service implemenation make it complex. For example I recommend NOT to mix business logic or data in your logging if possible! If you need custom error codes to be logged for example, you can write your own Exception class and encapsulate there, and then let the logging service do its job: just logging.

Here are some general rules about using logger in your application that I recommend:

-  Use `ERROR` log messages when there is reallyl a error! Try not to log an "acceptable" error message in your application. Treat an ERROR as critical problem in your application, like if it's in production, some one should be paged to take care of the problem immediately. Each message should have a full Java stacktrace! Some application might want to assign a unique Error Code to these level of messages for easier identification and troubleshoot purpose.
- Use `WARN` log messages if it's a problem that's ignorable during production operation, but not good idea to supress it. Likely these might point to potentially problem in your application or env. Each message should have a full Java stacktrace, if available that is!
- Use `INFO` log messages for admin operators or application monitors peoples to see how your application is doing. High level application status or some important and meaningful business information indicators etc. Do not litter your log with developer's messages and unessary verbose and unclear message. Each message should be written in clear sentence so operators knows it's meaningful.
- Use `DEBUG` log messages for developers to see and troubleshoot the application. Use this for critical application junction and operation to show objects and services states etc. Try not to add repeated loop info messages here and litter your log content.
- Use `TRACE` log message for developers to troubleshoot tight for loop and high traffic messages information.
- You should select a logger provider that let you configure and turn these logging levels ON or OFF (preferrable at runtime if possible as well). Each level should able to automatically suppress all levels below it. And ofcourse you want a logger provider that can handle log message output to STDOUT and/or to FILE as destination as well.

