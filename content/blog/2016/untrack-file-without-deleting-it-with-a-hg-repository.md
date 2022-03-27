Title: Untrack file without deleting it with a hg repository
Date: 2016-06-26 00:00:00-05:00
Tags: hg


So I have created a maven based Java project using IntelliJ IDEA, and I added all files to my hg repository with this .hgignore file in place:

    syntax: glob
    target/

Later I learned that I shouln't track one of IDEA's workspace file, so I want to remove from my repository tracking, but I do not want it be deleted. Here is what you should do:
    
    bash> hg forget .idea/workspace.xml
    bash> echo '.idea/workspace.xml' >> .hgignore

