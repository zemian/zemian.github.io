---
title: How to run Kotlin script file
date: 2015-08-03T00:00:00-05:00
tags:
  - kotlin
---
The script name MUST have ".kts" extension! If not, you will get a unfriendly error message.

```
kotlinc -script hello.kts

Hello World
```

vs


```
kotlinc -script hello.kt

EXCEPTION: java.lang.RuntimeException: Failed to evaluate script: java.lang.NullPointerException

        at org.jetbrains.kotlin.cli.jvm.compiler.KotlinToJVMBytecodeCompiler.compileScript(KotlinToJVMBytecodeCompiler.java:290)

        at org.jetbrains.kotlin.cli.jvm.compiler.KotlinToJVMBytecodeCompiler.compileAndExecuteScript(KotlinToJVMBytecodeCompiler.java:243)

        at org.jetbrains.kotlin.cli.jvm.K2JVMCompiler.doExecute(K2JVMCompiler.java:186)

        at org.jetbrains.kotlin.cli.jvm.K2JVMCompiler.doExecute(K2JVMCompiler.java:53)

        at org.jetbrains.kotlin.cli.common.CLICompiler.exec(CLICompiler.java:148)

        at org.jetbrains.kotlin.cli.common.CLICompiler.exec(CLICompiler.java:128)

        at org.jetbrains.kotlin.cli.common.CLICompiler.exec(CLICompiler.java:52)

        at org.jetbrains.kotlin.cli.common.CLICompiler.doMainNoExit(CLICompiler.java:197)

        at org.jetbrains.kotlin.cli.common.CLICompiler.doMain(CLICompiler.java:188)

        at org.jetbrains.kotlin.cli.jvm.K2JVMCompiler.main(K2JVMCompiler.java:57)

        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)

        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)

        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)

        at java.lang.reflect.Method.invoke(Method.java:606)

        at org.jetbrains.kotlin.preloading.Preloader.main(Preloader.java:83)

Caused by: java.lang.NullPointerException

        at org.jetbrains.kotlin.resolve.ScriptNameUtil.classNameForScript(ScriptNameUtil.java:33)

        at org.jetbrains.kotlin.cli.jvm.compiler.KotlinToJVMBytecodeCompiler.compileScript(KotlinToJVMBytecodeCompiler.java:286)

        ... 14 more
```

See http://kotlinlang.org/docs/tutorials/command-line.html
