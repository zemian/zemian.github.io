---
title: Enhancing Spring Test Framework with beforeClass and afterClass setup
date: 2012-09-28
tags:
  - java
  - spring
---

# How to allow instance methods to run as JUnit BeforeClass behavior

JUnit allows you to setup methods on the class level once before and after all tests methods invocation. However, by design on purpose that they restrict this to only *static* methods using `@BeforeClass` and `@AfterClass` annotations. For example this simple demo shows the typical Junit setup:

    package deng.junitdemo;
    
    import org.junit.AfterClass;
    import org.junit.BeforeClass;
    import org.junit.Test;
    
    public class DemoTest {
    
        @Test
        public void testOne() {
            System.out.println("Normal test method #1.");
        }
    
        @Test
        public void testTwo() {
            System.out.println("Normal test method #2.");
        }
    
        @BeforeClass
        public static void beforeClassSetup() {
            System.out.println("A static method setup before class.");
        }
    
        @AfterClass
        public static void afterClassSetup() {
            System.out.println("A static method setup after class.");
        }
    }
    

And above should result the following output:

    A static method setup before class.
    Normal test method #1.
    Normal test method #2.
    A static method setup after class.
    

This usage is fine for most of the time, but there are times you want to use non-static methods to setup the test. I will show you a more detailed use case later, but for now, let's see how we can solve this naughty problem with JUnit first. We can solve this by making the test
implements a Listener that provide the before and after callbacks, and we will need to digg into JUnit to detect this Listener to invoke our methods. This is a solution I came up with:

    package deng.junitdemo;
    
    import org.junit.Test;
    import org.junit.runner.RunWith;
    
    @RunWith(InstanceTestClassRunner.class)
    public class Demo2Test implements InstanceTestClassListener {
    
        @Test
        public void testOne() {
            System.out.println("Normal test method #1");
        }
    
        @Test
        public void testTwo() {
            System.out.println("Normal test method #2");
        }
    
        @Override
        public void beforeClassSetup() {
            System.out.println("An instance method setup before class.");
        }
    
        @Override
        public void afterClassSetup() {
            System.out.println("An instance method setup after class.");
        }
    }
    

As stated above, our Listener is a simple contract:

    package deng.junitdemo;
    
    public interface InstanceTestClassListener {
        void beforeClassSetup();
        void afterClassSetup();
    }
    

Our next task is to provide the JUnit runner implementation that will trigger the setup methods.

    package deng.junitdemo;
    
    import org.junit.runner.notification.RunNotifier;
    import org.junit.runners.BlockJUnit4ClassRunner;
    import org.junit.runners.model.InitializationError;
    
    public class InstanceTestClassRunner extends BlockJUnit4ClassRunner {
    
        private InstanceTestClassListener instanceSetupListener;
    
        public InstanceTestClassRunner(Class<?> klass) throws InitializationError {
            super(klass);
        }
    
        @Override
        protected Object createTest() throws Exception {
            Object test = super.createTest();
            // Note that JUnit4 will call this createTest() multiple times for each
            // test method, so we need to ensure to call "beforeClassSetup" only once.
            if (test instanceof InstanceTestClassListener && instanceSetupListener == null) {
                instanceSetupListener = (InstanceTestClassListener) test;
                instanceSetupListener.beforeClassSetup();
            }
            return test;
        }
    
        @Override
        public void run(RunNotifier notifier) {
            super.run(notifier);
            if (instanceSetupListener != null)
                instanceSetupListener.afterClassSetup();
        }
    }
    

Now we are in business. If we run above test, it should give us similar result, but this time we are using instance methods instead!

    An instance method setup before class.
    Normal test method #1
    Normal test method #2
    An instance method setup after class.
    

# A concrete use case: Working with Spring Test Framework

Now let me show you a real use case with above. If you use Spring Test Framework, you would normally setup a test like this so that you may have test fixture injected as member instance.

    package deng.junitdemo.spring;
    
    import static org.hamcrest.Matchers.is;
    import static org.junit.Assert.assertThat;
    
    import java.util.List;
    
    import javax.annotation.Resource;
    
    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
    
    @RunWith(SpringJUnit4ClassRunner.class)
    @ContextConfiguration
    public class SpringDemoTest {
    
        @Resource(name="myList")
        private List<String> myList;
    
        @Test
        public void testMyListInjection() {
            assertThat(myList.size(), is(2));
        }
    }
    

You would also need a spring xml under that same package for above to run:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
         <bean id="myList" class="java.util.ArrayList">
            <constructor-arg>
                <list>
                    <value>one</value>
                    <value>two</value>
                </list>
            </constructor-arg>
         </bean>
    </beans>
    

Pay very close attention to member instance `List<String> myList`. When running JUnit test, that field will be injected by Spring, and it can be used in any test method. However, if you ever want a one time setup of some code and get a reference to a Spring injected field, then you are in bad luck. This is because the JUnit `@BeforeClass` will force your method to be static; and if you make your field static, Spring injection won't work in your test!

Now if you are a frequent Spring user, you should know that Spring Test Framework already provided a way for you to handle this type of use case. Here is a way for you to do class level setup with Spring's style:

    package deng.junitdemo.spring;
    
    import static org.hamcrest.Matchers.is;
    import static org.junit.Assert.assertThat;
    
    import java.util.List;
    
    import javax.annotation.Resource;
    
    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.TestContext;
    import org.springframework.test.context.TestExecutionListeners;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
    import org.springframework.test.context.support.AbstractTestExecutionListener;
    import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
    
    @RunWith(SpringJUnit4ClassRunner.class)
    @TestExecutionListeners(listeners = {
            DependencyInjectionTestExecutionListener.class, 
            SpringDemo2Test.class})
    @ContextConfiguration
    public class SpringDemo2Test extends AbstractTestExecutionListener {
    
        @Resource(name="myList")
        private List<String> myList;
    
        @Test
        public void testMyListInjection() {
            assertThat(myList.size(), is(2));
        }
    
        @Override
        public void afterTestClass(TestContext testContext) {
            List<?> list = testContext.getApplicationContext().getBean("myList", List.class);
            assertThat((String)list.get(0), is("one"));
        }
    
        @Override
        public void beforeTestClass(TestContext testContext) {
            List<?> list = testContext.getApplicationContext().getBean("myList", List.class);
            assertThat((String)list.get(1), is("two"));
        }
    }
    

As you can see, Spring offers the `@TestExecutionListeners` annotation to allow you to write any Listener, and in it you will have a reference to the `TestContext` which has the `ApplicationContext` for you to get to the injected field reference. This works, but I find it not very elegant. It forces you to look up the bean, while your injected field is already available as field. But you can't use it unless you go through the `TestContext` parameter.

Now if you mix the solution we provided in the beginning, we will see a more prettier test setup. Let's see it:

    package deng.junitdemo.spring;
    
    import static org.hamcrest.Matchers.is;
    import static org.junit.Assert.assertThat;
    
    import java.util.List;
    
    import javax.annotation.Resource;
    
    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.test.context.ContextConfiguration;
    
    import deng.junitdemo.InstanceTestClassListener;
    
    @RunWith(SpringInstanceTestClassRunner.class)
    @ContextConfiguration
    public class SpringDemo3Test implements InstanceTestClassListener {
    
        @Resource(name="myList")
        private List<String> myList;
    
        @Test
        public void testMyListInjection() {
            assertThat(myList.size(), is(2));
        }
    
        @Override
        public void beforeClassSetup() {
            assertThat((String)myList.get(0), is("one"));
        }
    
        @Override
        public void afterClassSetup() {
            assertThat((String)myList.get(1), is("two"));
        }
    }
    

Now JUnit only allow you to use single `Runner`, so we must extends the Spring's version to insert what we did before.

    package deng.junitdemo.spring;
    
    import org.junit.runner.notification.RunNotifier;
    import org.junit.runners.model.InitializationError;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
    
    import deng.junitdemo.InstanceTestClassListener;
    
    public class SpringInstanceTestClassRunner extends SpringJUnit4ClassRunner {
    
        private InstanceTestClassListener instanceSetupListener;
    
        public SpringInstanceTestClassRunner(Class<?> clazz) throws InitializationError {
            super(clazz);
        }
    
        @Override
        protected Object createTest() throws Exception {
            Object test = super.createTest();
            // Note that JUnit4 will call this createTest() multiple times for each
            // test method, so we need to ensure to call "beforeClassSetup" only once.
            if (test instanceof InstanceTestClassListener && instanceSetupListener == null) {
                instanceSetupListener = (InstanceTestClassListener) test;
                instanceSetupListener.beforeClassSetup();
            }
            return test;
        }
    
        @Override
        public void run(RunNotifier notifier) {
            super.run(notifier);
            if (instanceSetupListener != null)
                instanceSetupListener.afterClassSetup();
        }
    }
    

That should do the trick. Running the test will give use this output:

    12:58:48 main INFO  org.springframework.test.context.support.AbstractContextLoader:139 | Detected default resource location "classpath:/deng/junitdemo/spring/SpringDemo3Test-context.xml" for test class [deng.junitdemo.spring.SpringDemo3Test].
    12:58:48 main INFO  org.springframework.test.context.support.DelegatingSmartContextLoader:148 | GenericXmlContextLoader detected default locations for context configuration [ContextConfigurationAttributes@74b23210 declaringClass = 'deng.junitdemo.spring.SpringDemo3Test', locations = '{classpath:/deng/junitdemo/spring/SpringDemo3Test-context.xml}', classes = '{}', inheritLocations = true, contextLoaderClass = 'org.springframework.test.context.ContextLoader'].
    12:58:48 main INFO  org.springframework.test.context.support.AnnotationConfigContextLoader:150 | Could not detect default configuration classes for test class [deng.junitdemo.spring.SpringDemo3Test]: SpringDemo3Test does not declare any static, non-private, non-final, inner classes annotated with @Configuration.
    12:58:48 main INFO  org.springframework.test.context.TestContextManager:185 | @TestExecutionListeners is not present for class [class deng.junitdemo.spring.SpringDemo3Test]: using defaults.
    12:58:48 main INFO  org.springframework.beans.factory.xml.XmlBeanDefinitionReader:315 | Loading XML bean definitions from class path resource [deng/junitdemo/spring/SpringDemo3Test-context.xml]
    12:58:48 main INFO  org.springframework.context.support.GenericApplicationContext:500 | Refreshing org.springframework.context.support.GenericApplicationContext@44c9d92c: startup date [Sat Sep 29 12:58:48 EDT 2012]; root of context hierarchy
    12:58:49 main INFO  org.springframework.beans.factory.support.DefaultListableBeanFactory:581 | Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@73c6641: defining beans [myList,org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalRequiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,org.springframework.context.annotation.ConfigurationClassPostProcessor$ImportAwareBeanPostProcessor#0]; root of factory hierarchy
    12:58:49 Thread-1 INFO  org.springframework.context.support.GenericApplicationContext:1025 | Closing org.springframework.context.support.GenericApplicationContext@44c9d92c: startup date [Sat Sep 29 12:58:48 EDT 2012]; root of context hierarchy
    12:58:49 Thread-1 INFO  org.springframework.beans.factory.support.DefaultListableBeanFactory:433 | Destroying singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@73c6641: defining beans [myList,org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalRequiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,org.springframework.context.annotation.ConfigurationClassPostProcessor$ImportAwareBeanPostProcessor#0]; root of factory hierarchy
    

Obviously the output shows nothing interesting here, but the test should run with all assertion passed. The point is that now we have a more elegant way to invoking a before and after test setup that are at class level, and they can be instance methods to allow Spring injection.

# Download the demo code

You may get above demo code in a working Maven project from [my sandbox](https://bitbucket.org/saltnlight5/sandbox/src/8d545b15fbbd/junit-examples).