---
title: Generating a war file from a plain IntelliJ web project
date: 2014-02-25
tags:
  - intellij
---
Sometimes you just want to create a quick web project in IntelliJ IDEA, and you would use their wizard and with web or Java EE module as starter project. But these projects will not have Ant nor Maven script generated for you automatically, and the IDEA Build would only compile your classes. So if you want an war file generated, try the following:

1) Menu: File > Project Structure > Artifacts

2) Click the green + icon and create a "Web Application: Archive", then OK

3) Menu: Build > Build Artifacts ... > Web: war

By default it should generate it under your <project>/out/artifacts/web_war.war

Note that IntelliJ also allows you to setup "Web Application: Exploded" artifact, which great for development that run and deploy to an application server within your IDE.