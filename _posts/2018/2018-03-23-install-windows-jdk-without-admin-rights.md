---
title: Install Windows JDK Without Admin Rights
date: 2018-03-23T00:00:00-05:00
tags:
  - jdk
---

Installing JDK 7
================

1.  Download [Oracle Java SE JDK 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
    In this example, we will use `jdk-7u80-windows-x64.exe`

2.  Extract `jdk-7u80-windows-x64.exe` using 7-zip tool. Right click the
    file then select context menu 7-zip &gt; Extract to
    `jdk-7u80-windows-x64`

3.  Go to the directory `jdk-7u80-windows-x64/.rsrc/1033/JAVA_CAB10`

    -   Step 1: Extract the file `111` using 7-zip again, which will
        result a `tools.zip` file

        * Right click the file then select context menu 7-zip > Extract here

    -   Step 2: Extract tools.zip using 7-zip tool again

        * Right click the file then select context menu 7-zip > Extract to `tools`

    -   Step 3: Open `cmd.exe` and cd into `tools` directory above, then
        run the following:
        
        ```
        for /r %i in (*.pack) do bin\unpack200 -r -v %i %~pi%~ni.jar
        ```
Or if you use Cygwin Bash, you can run this:

    find . -name '*.pack' -type f -exec sh -c 'bin/unpack200 -r -v $0 ${0/.pack/.jar}' {} \;

-   Step 4: Copy `tools` folder and rename it to `%USERPROFILE%/apps/jdk-7u80`

    1.  Optionally, if you want the JDK source code, following these
        instruction:

-   Step 1: Go to the directory Go to the directory    `jdk-7u80-windows-x64/.rsrc/1033/JAVA_CAB9`

-   Step 2: Extract the file `110`, which contains `src.zip`

-   Step 3: Copy `src.zip` into `%USERPROFILE%/apps/jdk-7u80`

Refs:
<http://stackoverflow.com/questions/10891405/installing-jdk-without-administrator-privileges>

Installing JDK 8
================

The JDK8 update 102 or higher has different file structure!

1.  Use 7-zip to unpack `jdk-8u131-windows-x64.exe`

2.  `cd .rsrc/1033/JAVA_CAB10`

3.  Use 7-zip to unpack `111` file and extract `tools.zip`

4.  Use same instructions as above to unpack `tools.zip`

Java source `src.zip` is within the file `110` located inside `.rsrc/1033/JAVA_CAB9`.

Installing JDK 9
================

Staring JDK9, the [OpenJDK](http://jdk.java.net/9) provides binary tar
ball (zipped) executable JDK package that can unpack in Windows in any
directory. But if you still want Oracle Java SE JDK, then you still use
above instruction to get around installing without admin rights.

Refs
====

<https://stackoverflow.com/questions/10891405/installing-jdk-without-administrator-privileges>
