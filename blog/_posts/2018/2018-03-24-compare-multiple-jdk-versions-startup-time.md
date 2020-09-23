---
title: Compare Multiple JDK Versions Startup Time
date: 2018-03-24T00:00:00-05:00
tags:
  - jdk-startup-time
  - python
---

**`jdk-startup-time-test.py`.**

    #!/usr/bin/env python3
    # Author: Zemian Deng 2018-03-24
    #
    # This script will test multiple JDK versions of startup time in your system
    # We assume all JDK are installed in $HOME/apps directory with
    # names matching in 'jdk_versions' list.
    # Also we asusme you compiled `hello.java` with lowest JDK
    # you have in the same directory as this script. This is
    # used for testing the JVM loading time.
    #
    # NOTE: Running the script using Cygwin is a LOT slower than
    # running it natively in cmd.exe shell! This is because
    # time for Cygwin to start Java is very slow!
    #

    import time, subprocess, os
    home_dir = os.path.expanduser('~')
    app_dir = home_dir + '/apps'
    jdk_versions = [
    'jdk-6u29',
    'jdk-7u80',
    'jdk-8u161',
    'jdk-9.0.4',
    'jdk-10']
    def test_jdk_startup(jdk):
            runs = []
            java_cmd = app_dir + '/' + jdk + '/bin/java'
            #print(f"Testing {java_cmd}")
            for _ in range(10):
                    t1 = time.time()
                    subprocess.check_output([java_cmd, 'hello'])
                    t2 = time.time()
                    runs.append(t2 - t1)
            return sum(runs) / len(runs)

    # Now test it
    for jdk in jdk_versions:
            t = test_jdk_startup(jdk)
            print(f"{jdk:20} avg start-time {t:.3}s")

Here is a sample of output:

    python3 jdk-startup-time-test.py

    jdk-6u29             avg start-time 0.301s
    jdk-7u80             avg start-time 0.122s
    jdk-8u161            avg start-time 0.178s
    jdk-9.0.4            avg start-time 0.359s
    jdk-10               avg start-time 0.323s
