Title: Getting JDK6 src.zip for new iMac
Date: 2012-07-03 00:00:00-05:00
Tags: java


I got a new iMac, and I have activated the first time usage of JDK6. It's all working, but it doesn't come with src.zip! I googled around but other's solution didn't work for me. (eg: http://stackoverflow.com/questions/4011002/java-eclipse-on-macosx-where-is-the-src-zip). I tried download their Apple JDK updates, but it still doesn't have the `src.zip`.

So finally realized that this is easier than it needs to be. You can download the full JDK source here: 

<http://download.java.net/openjdk/jdk6>

After unzip, you should see the src folder under like this:

`openjdk-6-src-b25-01_may_2012/jdk/src/share/classes`

I've set this in my Eclipse's `classes.jar` as source folder and it works great.

PS: If you install the JDK7 from Oracle for MacOSX, it does come with the `src.zip` properly. However if you use Eclipse IDE with maven that set target to 1.6, it still convenient to browse that version of the source.

