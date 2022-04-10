---
title: A strange case of Java generic and inheritage parameter passing
date: 2012-12-20T00:00:00-05:00
tags:
  - java
---

I came a cross some strange Java code and I would like to share it here. Take a look few of classes I have here:

```
    // file: AFoo.java
    package atest.deng;
    public abstract class AFoo<T> {
    }
    
    // file: Foo.java
    package atest.deng;
    public class Foo extends AFoo<String> {
    }
    
    // file: FooProcessor.java
    package atest.deng;
    public class FooProcessor<T> {
        public void process(Class<AFoo<?>> cls) {
            System.out.println(cls);
        }
    }
    
    // file: FooMain.java
    package atest.deng;
    public class FooMain {
        public static void main(String[] args) {
            new FooProcessor().process(Foo.class);
        }
    }
    
    bash> mvn compile
    bash> [INFO] BUILD SUCCESS
```   

I tried this with JDK6 + Maven and it compiles without problem. But try to remove the `<T>` part from `FooProcessor` and it will fail to compile!

```
    // file: FooProcessor.java
    package atest.deng;
    public class FooProcessor {
        public void process(Class<AFoo<?>> cls) {
            System.out.println(cls);
        }
    }
    
    bash> mvn clean compile
    bash> [ERROR] java-demo\src\main\java test\deng\FooMain.java:[4,26] process(java.lang.Class<atest.deng.AFoo<?>>) in atest.deng.FooProcessor cannot be applied to (java.lang.Class<atest.deng.Foo>)
```    

Without the `<T>` the code won't compile, and yet we are not even using it in this case. How and why `<T>` affects the method parameters invocation?

Now, we can improve the `FooProcessor` in this way so that the presence of `<T>` doesn't have any affect.

```
    package atest.deng;
    public class FooProcessor {
        public void process(Class<? extends AFoo<?>> cls) {
            System.out.println(cls);
        }
    }
```    

That's a more proper way to write the generic parameter anyway. But despite a better solution, the puzzle is that the original code compiled under the compiler, but only with the `<T>` presented, and yet it's not used. Wouldn't you consider this as a Java compiler bug?
