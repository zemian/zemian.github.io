(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{428:function(t,e,o){"use strict";o.r(e);var n=o(10),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("p",[t._v("When I installed new package in my Cygwin recently, it also automatically upgraded to latest Cygwin 1.7.15-1 DLL. After this, pressing CTRL+C no longer work")]),t._v(" "),o("p",[t._v("on a running Java process the cygwin shell. I found the reason why this happens, and here is the email I sent to cygwin mailing list:")]),t._v(" "),o("blockquote",[o("p",[t._v("Okay, I finally found out what's going on.")]),t._v(" "),o("p",[t._v('I used to have an old cygwin installed (not even sure what version) that only has "C:\\Cygwin\\Cygwin.bat" to start an terminal. This batch file open a terminal that I can run java.exe, and I used to hit CTRL+C to end it (not only that, it will also invoke the Java\'s shutdown hook.)')]),t._v(" "),o("p",[t._v("After I upgraded to cygwin 1.7.15-1 (it will auto upgrade when we run setup.exe!). The above behavior no longer works!")]),t._v(" "),o("p",[t._v('It turns out the new cygwin 1.7.15-1 automatically comes with Mintty terminal now, and will default to create a Shortcut to this on desktop. Well I still have a shortcut to "C:\\Cygwin\\Cygwin.bat". What I discover is that Java will no longer work with terminal that opens with "C:\\Cygwin\\Cygwin.bat"! But it DOES work with the Mintty terminal!')]),t._v(" "),o("p",[t._v("It's all great for me, because I kind of like Mintty terminal. It's kindda funny because for years I would love to use Mintty, but only to stop because CTRL+C wont' work there. Now we have reverse!")]),t._v(" "),o("p",[t._v("However, I have to point out also that although I can hit CTRL+C in mintty to kill a java.exe process, but it DOES NOT invoke the Java's shutdown hook process! Which is shame, because now I can't test my shutdown procedure code.")]),t._v(" "),o("p",[t._v("I hope cygwin team can look at this further and provide a good solution, even for the Java folks like myself. I can only cope with Windows because of cygwin exists, so kudo to all the cygwin team and their hard work!")]),t._v(" "),o("p",[t._v("Hope also this post will help other Java developers out there.")]),t._v(" "),o("p",[t._v("Cheers,\nZemian")])]),t._v(" "),o("p",[t._v("Ref: "),o("a",{attrs:{href:"http://old.nabble.com/CTRL%2BC-is-not-working-with-java-on-latest-cygwin-1.7.15-tt34147441.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://old.nabble.com/CTRL%2BC-is-not-working-with-java-on-latest-cygwin-1.7.15-tt34147441.html"),o("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=a.exports}}]);