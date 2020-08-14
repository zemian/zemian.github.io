---
title: Creating your own loop structure in Java 8 lambda
date: 2014-04-04
tags:
  - java
---
Java doesn't have an easy construct of repeat something N number of times. We can make a for loop of course, but many times we don't even care about the variable that we created in the loop. We just want repeat N times of some code and that's it. With the lambda available in Java 8, you may attempt something like this:

public class RepeatDemo {
    public static void main(String[] args) {
        // One liner repeat
        repeat(10, () -> System.out.println("HELLO"));

        // Multi-liners repeat
        repeat(10, () -> {
            System.out.println("HELLO");
            System.out.println("WORLD");
        });
    }
    
    static void repeat(int n, Runnable r) {
        for (int i = 0; i < n; i++)
            r.run();
    }
}

Probably not as eye pleasing or straight forward as the good fashion for-loop, but you do get rid of the unnecessary loop variable. Only if Java 8 would go extra mile and treat the lambda argument in method  with sugar syntax, then we could have it something like the Scala/Groovy style, which makes code more smoother. For example:

        // Wouldn't this be nice to have in Java?
        repeat(10) {
            System.out.println("HELLO");
            System.out.println("WORLD");
        }

Hum....