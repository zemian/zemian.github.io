---
title: How to setup Intellij IDE war exploded artifact with multiple CDI dependent projects
date: 2015-05-29T00:00:00-05:00
tags:
  - intellij
---
I have a large Java project with many sub modules, and they have simple top down dependencies like this:
```
ProjectX
+-ModuleLibA
+-ModuleLibB
+-ModuleCdiLibC
+-ModuleCdiLibC2
+-ModuleLibD
+-ModuleCdiLibE
+-ModuleCdiLibE2
+-ModuleCdiLibE3
+-ModuleLibF
+-ModuleLibG
+-ModuleWebAppX
```
Each of these modules has their own third party dependency jars. When I say top down, it simply means Module from bottom have all the one above sub module and its third party dependencies as well. The project is large, and with many files, but the structure is straight forward. It does have large amount of third party jars though. At the end, the webapp would have over 100 jars packaged in WEB-INF/lib folder!

When you create this project structure in IntelliJ IDE (no I do not have the luxury of using Maven in this case), all the third party dependencies are nicely exported and managed from one Module to another as I create my Project with existing source and third parties jars. I do not need to re-define any redudant jars libraries definitions between Modules. When it come to define ModuleWebAppX at the end, all I have to do is to add ModuleLibG as a project dependency, and it brings all the other "transitives" dependent jars in! This is all done by IntelliJ IDE, which is very nice!

IntelliJ IDE also let you setup Artifacts from your project to prepare for package and deployment that can run inside your IDE servers. By default, any web application will have an option to create a war:exploded artifact definition, and the IDE will automatically copy and update your project build artifacts into this output folder, and it can be deploy/redeploy into any EE server as exploded mode nicely.

All these work really smoothly, until there is one problem that hit hard! The way IntelliJ IDE package default war:exploded artifact is that it will copy all the .class files generated from each Modules into a single "out/artifact/ProjectX_war_exploded" output folder. This works most of the time when our Java package and classes are unique, but not so with resource files that's not unique! My project uses several dependent CDI based modules. As you might know, each CDI module suppose to define their own, one and single location at META-INF/beans.xml to enable it and to customize CDI behavior. But becuase IntelliJ IDE flatten everything into a single output directory, I've lost the unique beans.xml file per each Module!

This problem is hard to troubleshoot since it doesn't produce any error at first, nor it stops the web app from running. It just not able to load certain CDI beans that you have customized in the beans.xml!!!

To resolve this, I have to make the IntelliJIDE artifact dependent modules to generate it's JAR instead of all copy into a single output. But we still want it to auto copy generated build files into the JAR archive automatically when we make a change. Lukcly IntelliJ has this feature. This is how I do it:

1. Open your project settings then select Artifacts on left.

2. Choose your war:exploded artifacts and look to your right.

3. Under OutputLayout tab, expand WEB-INF/lib, then right clik and "Create Archive" > Enter your moduleX name.jar.

4. Right click this newly created archive moduleX.jar name, then "Add Copy of" > "Module Output" and select one of your dependent module.

5. Repeat for each of the CDI based Modules!

I wish there is a easier way to do across all Modules for this, but at least this manual solution works!
