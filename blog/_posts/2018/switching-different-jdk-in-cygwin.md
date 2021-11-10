---
title: Switching Different JDK in Cygwin
date: 2018-03-24T00:00:00-05:00
tags:
  - cygwin
  - jdk
  - java
---

I love to use bash shell terminal. It’s a much more powerful terminal to
do everyday tasks. Even in Windows, I can get most of what I need using
Cygwin. Unfortunately Java executable are native to OS only, and for
Windows, it would still work under Cygwin, but all the file system paths
are still native. Java can understand the mixed-path though, and it has
made somewhat easier than the Windows native backward slash path like
typing. This means we can define `JAVA_HOME` variable using mixed path
mode. In Cygwin, I define my `.bashrc` like this:

    export JAVA_HOME=C:/Users/zemian/apps/jdk-8u161
    PATH=$HOME/apps/jdk-8u161/bin:$PATH

I sometimes work with different version of JDK for various application
testing. In this case, I need a way to quicly switch JDK version in my
shell env. To make it easier, I have installed all of my JDK in a
`$HOME/apps` directory, and created symbolic links to each JDKs like
this:

```
    cd $HOME/apps
    ls -ld jdk*

    drwx------+ 1 zemian staff 0 Mar 24 16:58 jdk-8u161
    drwx------+ 1 zemian staff 0 Mar 24 10:57 jdk-9.0.4
    drwx------+ 1 zemian staff 0 Mar 24 10:48 jdk-10

    lrwxrwxrwx  1 zemian staff 9 Mar 24 16:55 jdk8 -> jdk-8u161
    lrwxrwxrwx  1 zemian staff 9 Mar 24 11:02 jdk9 -> jdk-9.0.4
    lrwxrwxrwx  1 zemian staff 6 Mar 24 11:00 jdk10 -> jdk-10
```

Now that each JDK has a nice consistent version number in path, then I
create a shell function like this to switch between them:

```bash
    # Switching Multiple JDK
    switchjava() {
            JDK="jdk$1"
            if [[ ! -d $APPS_DIR/$JDK ]]; then
                    echo "ERROR: JDK path not found: $APPS_DIR/$JDK"
                    return
            fi
            export JAVA_HOME=`cygpath -wm $APPS_DIR/$JDK`
            export PATH=$APPS_DIR/$JDK/bin:$PATH

            # Verifying java
            echo "Switched JAVA_HOME to $JAVA_HOME"
            echo "Java Path:"
            which java
            echo "Java Version:"
            java -version
    }
```

To put it in use, it looks like this:

```
    $ switchjava 9
    Switched JAVA_HOME to C:/Users/zemian/apps/jdk-9.0.4
    Java Path:
    /home/zemian/apps/jdk9/bin/java
    Java Version:
    openjdk version "9.0.4"
    OpenJDK Runtime Environment (build 9.0.4+11)
    OpenJDK 64-Bit Server VM (build 9.0.4+11, mixed mode)

    $ switchjava 8
    Switched JAVA_HOME to C:/Users/zemian/apps/jdk-8u161
    Java Path:
    /home/zemian/apps/jdk8/bin/java
    Java Version:
    java version "1.8.0_161"
    Java(TM) SE Runtime Environment (build 1.8.0_161-b12)
    Java HotSpot(TM) 64-Bit Server VM (build 25.161-b12, mixed mode)
```
