(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{483:function(o,t,e){"use strict";e.r(t);var r=e(10),i=Object(r.a)({},(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[e("p",[o._v("Here is how you can convert "),e("code",[o._v("asciidoc")]),o._v(" text using Groovy script:")]),o._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[o._v("// filename: RunAsciidoc.groovy\n@Grab('org.asciidoctor:asciidoctor-java-integration:0.1.3')\nimport org.asciidoctor.*\ndef asciidoctor = Asciidoctor.Factory.create()\ndef output = asciidoctor.renderFile(new File(args[0]),  [:])\nprintln(output);\n")])])]),e("p",[o._v("Now you may run it")]),o._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[o._v("groovy RunAsciidoc.groovy myarticle.txt\n")])])]),e("p",[o._v("Many thanks to the "),e("code",[o._v("asciidoctor.org")]),o._v(" project!")])])}),[],!1,null,null,null);t.default=i.exports}}]);