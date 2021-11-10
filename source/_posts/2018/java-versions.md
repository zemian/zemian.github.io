---
title: Java versions
date: 2018-03-26T00:00:00-05:00
tags:
  - java
  - javap
---

How to check Java version from compiled classes

    javap -cp target/classes -verbose com.zemian.hellojava.App | grep 'major version'
    major version: 49

You may use this forumla to get the JDK version:
`<class_file_major_ver> - 44 = JDK version`. So this means above class
is targeted for JDK 5 (1.5).

Here are more examples of different class format versions matching to
JDK versions.

    major version: 45.3 = Java 1.1
    major version: 46 = Java 1.2
    major version: 47 = Java 1.3
    major version: 48 = Java 1.4
    major version: 49 = Java 1.5
    major version: 50 = Java 1.6
    major version: 51 = Java 1.7
    major version: 52 = Java 1.8
    major version: 53 = Java 9
    major version: 54 = Java 10

Ref: <https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html>
