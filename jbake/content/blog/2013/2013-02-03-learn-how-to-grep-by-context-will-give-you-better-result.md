---
title: Learn how to grep by context will give you better result
date: 2013-02-03
tags:
  - linux
---

I learned that `grep` command supports few options called "context" searching. Basically it can print lines around the matching string! For example, you can use this feature to perform a quick Java threads stack analysis like this (assuming you have a java process PID=12345).

    
    bash> jstack 12345 | grep --color 'State: BLOCKED' -B 1
    "A-Bad-Boy-Thread" prio=5 tid=0x00007fcfbc895800 nid=0xcd03 waiting on condition [0x00000001657cb000]
       java.lang.Thread.State: BLOCKED (on object monitor)
    

See, without the "-B 1" option, which show one line before match, you won't know which name of the tread that's acting up! Now isn't that a gem!

You may also use "-A 5" to see 5 more lines after the match. Or you may use the "-C 5" to see 5 lines before and after the match.

PS: There is nothing wrong with a "BLOCKED" thread in Java, however if you got one that won't go away, then it's a good indicator that something is fishy about that thread in your application; because in a well designed app, threads should be in BLOCKED state as briefly as possible. Read the javadoc on `java.lang.Thread.State` for more details.