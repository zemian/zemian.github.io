title=Intellij IDEA is pretty awesome!
date=2012-12-11
type=post
tags=intellij
status=published
~~~~~~
Did you know IntelliJ IDEA has a free Community Edition you may [download](http://www.jetbrains.com/idea/download/index.html)? I've been test driving it, and I will post few things I learned so far.

Here are few things that I usually change from out of the default installed settings.

1. File > Settings > Editor => Uncheck "Allow placement of caret after end of line" -- This is the most annoying thing for me in IDE. It's just not for me.
2. File > Settings > Editor > Appearance => Check "Show line numbers" -- I tend to relate errors and navigate content better with line number displayed.
3. File > Settings > Appearance > Theme => Select "Darcula" -- This is latest version 12.0 feature. Dark screen is pretty eye pleasing compare to WHITE.
4. File > Settings > Compiler => Check "Make project automatically" -- Another new 12.0 feature that would perform incremental compile.

Now the IDE is ready for me to work on any Java projects. If you work with Maven, then you will be happy to know that IDEA supports it out of box. You can get an existing project started with following steps:

1. File > Import Project => Browse to your project pom.xml. Even if you have multi Maven modules, you only need to pick the top level pom.xml and it will generate the multi IDEA modules for you automatically. Then click "Ok" button.

2. In "Import project from external model" select "Maven", and then "Next".
3. You can accept all default settings on this prompt, and simply go "Next"
4. Check all maven project to import
5. Next screen is selecting a SDK for this project (meaning pick a JDK) to use. If this is your first time setup, then create a new one by click on the Grean plus icon, then browse to your JAVA_HOME directory and click OK. Click "Next" to go next step.

6. Simply click "Next" to accept default project name. Then you are at last prompt. Simply click "Finish" button and you should have your project ready to go.

It might seems like a lot of steps to import a project, but IDEA is really nice. After your project has completely imported and compiled, you should able open any of your Java class (use CTRL+N) that has `main` method or any JUnit classes. Right click the content editor and select "Run ..." to execute it (or CTRL+SHIFT+F10 to run any single unit test method).

I have tried a decent size Java projects (few thousand source files) and it handles it very gracefully. The UI such as Menu items, Control buttons and tool bars are very user friendly and intuitive to use. Also, right click on most places should give you a "Context" menu with related options. Like any IDE, it supports the CTRL+Space that auto complete code as you type. There is the ALT+ENTER would suggest hints on how to fix things when you got an error with red squiggle line. Pressing CTRL+B will jump into methods or variable declarations.

Another tips I have for you is the IDEA uses many icon symbols to represent many things. These give you quick visual status on files, progress and states of your Classes etc. It's helpful to see what they mean using this [http://www.jetbrains.com/idea/webhelp/symbols.html](http://www.jetbrains.com/idea/webhelp/symbols.html)

So overall, I think IntelliJ IDEA is pretty good and awesome in many way.
 