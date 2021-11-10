---
title: What's up with the JUnit and Hamcrest dependencies?
date: 2012-10-06T00:00:00-05:00
tags:
  - java
  - junit
---

It's awesome that [JUnit](http://www.junit.org/) is recognizing the usefulness of [Hamcrest](http://code.google.com/p/hamcrest/), because I use these two a lot. However, I find JUnit packaging of their dependencies odd, and can cause class loading problem if you are not careful. 

Let's take a closer look. If you look at `junit:junit:4.10` from Maven Central, you will see that it has this dependencies graph:

```
    +- junit:junit:jar:4.10:test
        |  - org.hamcrest:hamcrest-core:jar:1.1:test
```    

This is great, except that inside the `junit-4.10.jar`, you will also find the `hamcrest-core-1.1.jar` content are *embedded*! 

But **why???**

I suppose it's a convenient for folks who use Ant, so that they save one jar to package in their `lib` folder, but it's not very Maven friendly. And you also expect classloading trouble if you want to upgrade Hamcrest or use extra Hamcrest modules.

Now if you use Hamcrest long enough, you know that most of their goodies are in the second module named `hamcrest-library`, but this JUnit didn't package in. JUnit however chose to include some JUnit+Hamcrest extension of their own. Now including duplicated classes in jar are very trouble maker, so JUnit has a separated module `junit-dep` that doesn't include Hamcrest core package and help you avoid this issue. So if you are using Maven project, you should use this instead.

```
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit-dep</artifactId>
        <version>4.10</version>
        <scope>test</scope>
        <exclusions>
            <exclusion>
                <groupId>org.hamcrest</groupId>
                <artifactId>hamcrest-core</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest-library</artifactId>
        <version>1.2.1</version>
        <scope>test</scope>
    </dependency>
```    

Notice that's a `junit-dep`, and also on how I have to exclude hamcrest from it. This is needed if you want `hamcrest-library` that has higher version than the one JUnit comes with, which is `1.1`. 

Interesting enough, Maven's dependencies in pom is order sensitive when it comes to auto resolving conflicting versions dependencies. Actually it would just pick the first one found and ignore the rest. So you can shorten above without exclusion if, only if, you place the Hamcrest bofore JUnit like this:

```
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest-library</artifactId>
        <version>1.2.1</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit-dep</artifactId>
        <version>4.10</version>
        <scope>test</scope>
    </dependency>    
```

This should make Maven use the following dependencies:

```
    +- org.hamcrest:hamcrest-library:jar:1.2.1:test
    |  \- org.hamcrest:hamcrest-core:jar:1.2.1:test
    +- junit:junit-dep:jar:4.10:test
```    

However I think using the exclusion tag would probably give you more stable build and not rely on Maven implicit ordering rule. And it avoid easy mistake for Maven beginer users. However I wish JUnit would do a better job at packaging and remove duplicated classes in jar. I personally think it's more productive for JUnit to also include `hamcrest-libray` instead of just the `hamcrest-core` jar.

What do you think?
