---
title: Boost your Groovy with NailGun
date: 2012-09-13
tags:
  - groovy
---

Are you working on a large Hibernate project that takes long time to load up all the `hbm.xml` files when creating the 
`Session` object? This is fine during deployment and runtime because it only loads it once. However, often time we also 
need to the same `Session` object to do some ad-hoc `HQL` queries to debug or validate data. Loading and re-loading
large mapping files in a `Session` to just execute single query is very painful.

Now, I like to poke around Java things with `Groovy`, and it's a great tool to peek at your data as ad-hoc queries as well. 
You can easily do this with their `groovyConsole` GUI tool and add `--classpath` option to include your project classes. This
will bring up a tiny Editor, and you can script to load your hibernate `Session` there. Once the first run is loaded (the 
hibenrate `Session` created), then second run is almost in an instant.

Running the little `groovyConsole` had wet my appetite, and I was hungry for a better text editor, but yet I don't really
want a full blow IDE for scripting. I like do my scripting in a plain editor. Now if you have an editor such as [Sublime Text 2](http://sublimetext.com) (ST2) that has a "build" feature to execute a external command, then you will enjoy scripting much more. With
ST2, I can have it call `groovy.bat` from inside the editor on the script that I am editing. However, there is another problem: the external command will restart a new JVM process on each run! Now I am back to square one.

To solve this problem, and still have my cake (editor), I recalled an awesome tool called [NailGun](http://www.martiansoftware.com/nailgun/index.html). This works perfectly with Groovy and my problem. I can start a server like this

    java -cp "groovy-all-2.0.1.jar:nailgun-0.7.1.jar" -server com.martiansoftware.nailgun.NGServer
    

And then in my ST2 editor, I can run an external command like this as the NailGun client:

    /path/to/nailgun-0.7.1/ng groovy.ui.GroovyMain test.groovy
    

Nail gun client sends the script file content to the server and prints the result. Again, after first run, the second run should
be instantaneously.

There, I scratched my itch.

# Details on how to setup Sublime Text 2 to run NailGun client

1. Go to menu: "Preference > Browse Packages"
2. Open the Groovy folder
3. Save a file named "GroovyNailGunClient.sublime-build" with the following:
	```    
       {
         "cmd": ["/path/to/nailgun-0.7.1/ng", "groovy.ui.GroovyMain", "$file"],
         "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
         "selector": "source.groovy"
       }
    ```
4. Select menu "Tool > Build System > GroovyNailGunClient"
5. Press `CTRL+B` to run any groovy file in your editor.