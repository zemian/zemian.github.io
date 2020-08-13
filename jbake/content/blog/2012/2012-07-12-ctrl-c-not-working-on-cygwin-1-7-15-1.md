title=CTRL+C not working on Cygwin 1.7.15-1
date=2012-07-12
type=post
tags=cygwin
status=published
~~~~~~
When I installed new package in my Cygwin recently, it also automatically upgraded to latest Cygwin 1.7.15-1 DLL. After this, pressing CTRL+C no longer work

on a running Java process the cygwin shell. I found the reason why this happens, and here is the email I sent to cygwin mailing list:

> Okay, I finally found out what's going on.
> 
> I used to have an old cygwin installed (not even sure what version) that only has "C:\Cygwin\Cygwin.bat" to start an terminal. This batch file open a terminal that I can run java.exe, and I used to hit CTRL+C to end it (not only that, it will also invoke the Java's shutdown hook.)
> 
> After I upgraded to cygwin 1.7.15-1 (it will auto upgrade when we run setup.exe!). The above behavior no longer works!
> 
> It turns out the new cygwin 1.7.15-1 automatically comes with Mintty terminal now, and will default to create a Shortcut to this on desktop. Well I still have a shortcut to "C:\Cygwin\Cygwin.bat". What I discover is that Java will no longer work with terminal that opens with "C:\Cygwin\Cygwin.bat"! But it DOES work with the Mintty terminal!
> 
> It's all great for me, because I kind of like Mintty terminal. It's kindda funny because for years I would love to use Mintty, but only to stop because CTRL+C wont' work there. Now we have reverse!
> 
> However, I have to point out also that although I can hit CTRL+C in mintty to kill a java.exe process, but it DOES NOT invoke the Java's shutdown hook process! Which is shame, because now I can't test my shutdown procedure code.
> 
> I hope cygwin team can look at this further and provide a good solution, even for the Java folks like myself. I can only cope with Windows because of cygwin exists, so kudo to all the cygwin team and their hard work!
> 
> Hope also this post will help other Java developers out there.
> 
> Cheers,
> Zemian 

Ref: [http://old.nabble.com/CTRL%2BC-is-not-working-with-java-on-latest-cygwin-1.7.15-tt34147441.html](http://old.nabble.com/CTRL%2BC-is-not-working-with-java-on-latest-cygwin-1.7.15-tt34147441.html)