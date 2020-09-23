(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{518:function(e,t,n){"use strict";n.r(t);var a=n(10),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("Here is how I enable remote debugging with WebLogic Server (11g) and Eclipse IDE. (Actually the java option is for any JVM, just the instruction here is WLS specific.)")]),e._v(" "),n("ol",[n("li",[e._v("Edit "),n("code",[e._v("<my_domain>/bin/setDomainEnv.sh")]),e._v(" file and add this on top:")])]),e._v(" "),n("p",[n("code",[e._v('JAVA_OPTIONS="$JAVA_OPTIONS -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n"')]),e._v("\nThe "),n("code",[e._v("suspend=n")]),e._v(" will start your server without wait for you to connect with IDE. Server usually started with bunch of waiting threads and you can connect with an IDE any any time. You then try to place a break point and fetch a new HTTP request etc to initiate a thread to go into the code breakponit. If you don't want the WLS to wait before fully started, then set it to suspend=y instead.")]),e._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[e._v("Start/restart your WLS with "),n("code",[e._v("<my_domain>/bin/startWebLogic.sh")])])]),e._v(" "),n("li",[n("p",[e._v("Once WLS is running, you may connect to it using Eclipse IDE. Go to Menu: Run > Debug Configuration ... > Remote Java Application and create a new entry. Ensure your port number is matching to what you used above.")])])]),e._v(" "),n("p",[e._v("Read more java debugging option here: "),n("a",{attrs:{href:"http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html#DebuggingOptions",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html#DebuggingOptions"),n("OutboundLink")],1)]),e._v(" "),n("p",[e._v("Now on the IDE Eclipse side, you can connect to your WLS server with the following instruction:")]),e._v(" "),n("ol",[n("li",[n("p",[e._v("In Eclipse menu, select Run > Debug Configuration ...")])]),e._v(" "),n("li",[n("p",[e._v("On left side, select Remote Java Application, and then press the + button to create a new configuration.")])]),e._v(" "),n("li",[n("p",[e._v("On the right side you can fill in the server info such as hostname and port number.")])]),e._v(" "),n("li",[n("p",[e._v("Click Debug button")])])]),e._v(" "),n("p",[e._v("UPDATE (10/30/14):")]),e._v(" "),n("p",[e._v("Remember each remote debug setup is per JVM and requires a unique port. So how to set each WebLogic Managed Server with unique debug port? You can easily do this by updating your line above to this:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('DEBUG_PORT=${DEBUG_PORT:=8000}\nJAVA_OPTIONS="$JAVA_OPTIONS -Xrunjdwp:transport=dt_socket,address=$DEBUG_PORT,server=y,suspend=n" \n')])])]),n("p",[e._v("Now you can start managed server like this to change the port in a Bash shell by change to your domain directory first, then run:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("bash>DEBUG_PORT=8001 bin/startManagedWeblogic.sh my_server_name\n")])])])])}),[],!1,null,null,null);t.default=o.exports}}]);