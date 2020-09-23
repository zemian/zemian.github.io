(window.webpackJsonp=window.webpackJsonp||[]).push([[221],{603:function(e,t,n){"use strict";n.r(t);var o=n(10),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("Here are my notes on installing "),n("a",{attrs:{href:"http://cx-oracle.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("cx_Oracle")]),e._v(" python\nmodule"),n("OutboundLink")],1),e._v(" to access Oracle Database\n12c. First, you need to download these two packages from "),n("a",{attrs:{href:"http://www.oracle.com/technetwork/database/features/instant-client",target:"_blank",rel:"noopener noreferrer"}},[e._v("Oracle Instant\nClient"),n("OutboundLink")],1),e._v("\nsite.")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("Instant Client Package - Basic")])]),e._v(" "),n("li",[n("p",[e._v("Instant Client Package - SDK")])])]),e._v(" "),n("p",[e._v("I’ve tried their "),n("code",[e._v(".rpm")]),e._v(" packages and it did not work for me on Linux, so\nI would suggest you use the "),n("code",[e._v(".zip")]),e._v(" packages instead.")]),e._v(" "),n("p",[e._v("Once you downloaded these two, unzip them into a single directory (eg:\n"),n("code",[e._v("$HOME/apps/instantclient")]),e._v("). You then need to follow these instructions\nto install the module itself.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("cd $HOME/apps/instantclient\nln -s libclntsh.so.12.1 libclntsh.so\nexport ORACLE_HOME=$HOME/apps/instantclient\nexport LD_LIBRARY_PATH=$ORACLE_HOME:$LD_LIBRARY_PATH\n\npip install cx_Oracle\n")])])]),n("p",[e._v("Here are some quick python test code to verify "),n("code",[e._v("cx_Oracle")]),e._v(" is working.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("import cx_Oracle as db\ndsn='(DESCRIPTION=(ADDRESS=(HOST=myhost)(PORT=1521)(PROTOCOL=TCP))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orcl)))'\nconn = db.connect('zemian', 'Welcome1', dsn)\ncur = conn.cursor()\ncur.execute('SELECT 1+1')\nprint(cur.fetchone()[0])\ncur.close()\nconn.close()\n")])])]),n("p",[e._v("Using the "),n("code",[e._v("dsn")]),e._v(" form above can connect directly to database without the\nneed to setup further entry in Oracle’s "),n("code",[e._v("tnsnames.ora")]),e._v(" file.")]),e._v(" "),n("h1",{attrs:{id:"optionally-installing-sqlplus-client"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#optionally-installing-sqlplus-client"}},[e._v("#")]),e._v(" Optionally installing sqlplus client")]),e._v(" "),n("p",[e._v("The "),n("code",[e._v("sqlplus")]),e._v(" is a classic client you may use to connect to the Oracle\ndatabase. You may install this to perform adhoc query and verify your\ndata. Download the following from the same download site above.")]),e._v(" "),n("ul",[n("li",[e._v("Instant Client Package - "),n("code",[e._v("SQL\\*Plus")])])]),e._v(" "),n("p",[e._v("Unzip and then add the following to your "),n("code",[e._v("PATH")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("export $ORACLE_HOME/bin:$PATH\n\nsqlplus mydbuser@(DESCRIPTION=(ADDRESS=(HOST=myhost)(PORT=1521)(PROTOCOL=TCP))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orcl)))\n")])])]),n("p",[e._v("For more information, see "),n("a",{attrs:{href:"https://docs.oracle.com/database/121/SQPUG/toc.htm",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("sqlplus")]),e._v("\ndoc"),n("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=a.exports}}]);