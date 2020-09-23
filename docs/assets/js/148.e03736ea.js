(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{530:function(e,a,t){"use strict";t.r(a);var s=t(10),r=Object(s.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("Here is how you can automate deployment for WebLogic server using command line.")]),e._v(" "),t("p",[e._v("First source the env settings from the server:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ source $ML_HOME/server/bin/setWLSEnv.sh\n")])])]),t("p",[e._v("Deploy Library:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ java weblogic.Deployer -nostage -deploy -library \\\n-adminurl localhost:7001 \\\n-username weblogic -password my_secret \\\n-targets myserver \\\nmy_shared_lib.war\n")])])]),t("p",[e._v("Deploy Application:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ java weblogic.Deployer -nostage -deploy \\\n-adminurl localhost:7001 \\\n-username weblogic -password my_secret \\\n-targets myserver \\\n-name myapp.war myapp.war\n")])])]),t("p",[e._v('For development, you likely want to use the "-nostage" meaning to deploy the app or library directly from the file system. This means any changes to that file location and a reload from WLS will take effect immediately.')]),e._v(" "),t("p",[e._v("For undeploy the command line options are same for library or app but with matching name.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ java weblogic.Deployer -undeploy \\\n-adminurl localhost:7001 \\\n-username weblogic -password my_secret \\\n-targets myserver \\\n-name myapp_or_lib.war\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);