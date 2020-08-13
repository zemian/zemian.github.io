title=A better java shell script wrapper
date=2012-08-01
type=post
tags=java, bash, shell
status=published
~~~~~~

In many Java projects, you often see wrapper shell script to invoke the `java` command with its custom application parameters. For example, `$ANT_HOME/bin/ant`, `$GROOVY_HOME/bin/groovy`, or even in our [TimeMachine Scheduler](http://bitbucket.org/timemachine/scheduler) you will see `$TIMEMACHINE_HOME/bin/scheduler.sh`.

Writing these wrapper script is boring and error prone. Most of the problems come from setting the correct classpath for the application. If you're working on an in-house project for a company, then you can get away with hardcoding paths and your environment vars. But for open source projects, folks have to make the wrapper more flexible and generic. Most of them even provide a `.bat` version of it. Windows DOS is really a brutal and limited terminal to script away your project need. For this reason, I often encourage others to use Cygwin as much as they can. It at least has a real bash shell to work with. Another common problem with these wrappers is it can quickly get out of hand and have too many duplication of similar scripts liter every where in your project.

In this post, I will show you a Java wrapper script that I've written. It's simple to use and very flexible for running just about any Java program. Let's see how it's used first, and then I will print its content at the bottom of the post.

## Introducing the `run-java` wrapper script

If you take a look at `$TIMEMACHINE_HOME/bin/scheduler.sh`, you will see that it in turns calls a `run-java` script that comes in the same directory.

    DIR=$(dirname $0)
    SCHEDULER_HOME=$DIR/..
    $DIR/run-java -Dscheduler.home="$SCHEDULER_HOME" timemachine.scheduler.tool.SchedulerServer "$@"
    

As you can see, our `run-java` can take `-D` options. Not only this, it can also take `-cp` option as well! What's more is that you can specify these options even **after** the main class! This makes the `run-java` re-wrappable by other script, and still be able to add additional system properties and classpath.

For examples, the TimeMachine comes with Groovy library, so instead of downloading it's full distribution again, you can simply invoke the groovy like this

    $TIMEMACHINE_HOME/bin/run-java groovy.ui.GroovyMain test.groovy
    

You can use `run-java` in any directory you're in, so it's convenient. It will resolve it's own directory and load any jars in the `lib` directory automatically. Now if you want Groovy to run with more additional jars, you can use the `-cp` option like this:

    $TIMEMACHINE_HOME/bin/run-java -cp "$HOME/apps/my-app/lib/*" groovy.ui.GroovyMain test.groovy
    

Often times things will go wrong if you are not careful with Java classpath, but with `run-java` script you can perform a dry run first:

    RUN_JAVA_DRY=1 $TIMEMACHINE_HOME/bin/run-java -cp "$HOME/apps/my-app/lib/*" groovy.ui.GroovyMain test.groovy
    

You would run the above all in single line on a command prompt. It should print out your full java command with all options and arguments for you to inspect.

There are many more options to the script, which you can find out more by reading the comments in it. The current script will work on any Linux bash or on a Windows Cygwin terminal.

## Using `run-java` during development with Maven

Above examples are assuming you are in a released project structure such as this:

    $TIMEMACHINE_HOME
      +- bin/run-java
      +- lib/*.jar
    

But what about during development? A frequent use case is that you want to be able to run your latest compiled classes under `target/classes` without have to package up or release the entire project. You can use our `run-java` in these scenario as well. First, simply add `bin/run-java` in your project, then you run `mvn compile dependency:copy-dependencies` that will generate all the `jar` files into `target/dependency`. That's all. The `run-java` will automatically detect these directories and create the correct classpath to run your main class.

If you use Eclipse IDE for development, then your `target/classes` will be always up-to-date, and the `run-java` can be a great gem to have in your project even for development.
