(window.webpackJsonp=window.webpackJsonp||[]).push([[214],{596:function(e,t,o){"use strict";o.r(t);var s=o(10),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v('In WLS, you can import your own SSL cert into its trust keystore file to invoke "https" contents. Here is how you do that with the default WLS '),o("code",[e._v("DemoTrust.jks")]),e._v(" file.")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v("bash> cd $WL_HOME/server/lib\nbash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -list\nbash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -importcert -alias mycert -file mycert.pem\n\n# Or to delete the entry\nbash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -delete -alias mycert\n")])])]),o("p",[e._v("The file "),o("code",[e._v("mycert.pem")]),e._v(' can be obtained by any modern browser when you visit the "https" site. For example using Firefox, you can follow these steps to export the cert file:')]),e._v(" "),o("ol",[o("li",[o("p",[e._v("Click on the Lock icon next to the URL in the broswer")])]),e._v(" "),o("li",[o("p",[e._v('Click More Information button, then go to the "Security Tab"')])]),e._v(" "),o("li",[o("p",[e._v("Click View Certificate button, then go to the Details tab")])]),e._v(" "),o("li",[o("p",[e._v("Click Export\n​ button")])]),e._v(" "),o("li",[o("p",[e._v("On the bottom right corner dropdown, select X.509 Cerificate with chain (PEM)")])]),e._v(" "),o("li",[o("p",[e._v("Type name of file to save (eg: "),o("code",[e._v("mycert.pem")]),e._v(") and then click Save button")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);