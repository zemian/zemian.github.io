(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{492:function(e,t,a){"use strict";a.r(t);var o=a(10),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("A good sample data generator can help you test program more throughly and help measure\nthe processing throughput. The "),a("code",[e._v("camel-core")]),e._v(" comes with a "),a("code",[e._v("dataset")]),e._v(" component that can\nhelp you do this easily. All you need is to provide a bean that implements\n"),a("code",[e._v("org.apache.camel.component.dataset.DataSet")]),e._v(" interface and bind it in\nCamelContext registry. Here is an example:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('package camelcoredemo;\n\nimport org.slf4j.*;\nimport org.apache.camel.*;\nimport org.apache.camel.builder.*;\nimport org.apache.camel.main.Main;\nimport org.apache.camel.component.dataset.*;\n\npublic class DataSetDemoCamel extends Main {\n    static Logger LOG = LoggerFactory.getLogger(DataSetDemoCamel.class);\n    public static void main(String[] args) throws Exception {\n        DataSetDemoCamel main = new DataSetDemoCamel();\n        main.enableHangupSupport();\n        main.addRouteBuilder(createRouteBuilder());\n        main.bind("sampleGenerator", createDataSet());\n        main.run(args);\n    }\n    static RouteBuilder createRouteBuilder() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("dataset://sampleGenerator")\n                .to("log://demo");\n            }\n        };\n    }\n    static DataSet createDataSet() {\n        return new SimpleDataSet();\n    }\n}\n')])])]),a("p",[e._v("Compile and run it.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("mvn compile exec:java -Dexec.mainClass=camelcoredemo.DataSetDemoCamel\n")])])]),a("p",[e._v("In here we have used the built-in "),a("code",[e._v("org.apache.camel.component.dataset.SimpleDataSet")]),e._v("\nimplementation, which by default will generate 10 messages with a text body set\nto "),a("code",[e._v("<hello>world!</hello>")]),e._v(". You may easily change the value, or even provide your own\nimplementation starting with "),a("code",[e._v("org.apache.camel.component.dataset.DataSetSupport")]),e._v(" base\nclass to customize your data set.")]),e._v(" "),a("h2",{attrs:{id:"use-dataset-component-to-measure-throughput"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use-dataset-component-to-measure-throughput"}},[e._v("#")]),e._v(" Use DataSet Component to measure throughput")]),e._v(" "),a("p",[e._v("One useful feature of "),a("code",[e._v("dataset")]),e._v(" component I found is using it to load test your "),a("code",[e._v("Route")]),e._v(".\nTo do this, you have to adjust couple settings though. Let’s say if I want to load\na large text file as sample input data and feed it to the "),a("code",[e._v("Route")]),e._v(", and then measure its\nthroughout.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('    static RouteBuilder createRouteBuilder() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("dataset://sampleGenerator?produceDelay=0")\n                .to("log://demo?groupSize=100");\n            }\n        };\n    }\n    static DataSet createDataSet() {\n        SimpleDataSet result = new SimpleDataSet();\n        result.setSize(500);\n        result.setDefaultBody(readFileToString("my-large-sample.txt");\n        return result;\n    }\n')])])]),a("p",[e._v("Replace above in the "),a("code",[e._v("Main")]),e._v(" class and you will notice that it will pump 500 messages\ninto the "),a("code",[e._v("Route")]),e._v(", and it samples every 100 messages and display its throught rates. I\nhave to add "),a("code",[e._v("produceDelay=0")]),e._v(" option so the generator so it will not pause between messages.\nThen I have added "),a("code",[e._v("groupSize=100")]),e._v(" option to "),a("code",[e._v("log")]),e._v(" component for throughput measurement.\nI skipped "),a("code",[e._v("readFileToString(String)")]),e._v(" demo code since I assume you can easily figured that\nout on your own. (Hint: checkout Apache "),a("code",[e._v("commons-io")]),e._v(" library.)")]),e._v(" "),a("p",[e._v("There is another side of "),a("code",[e._v("dataset")]),e._v(" component that you may use, and that is to receive and\nverify message content. You would simply use the same URL in a\n"),a("code",[e._v("to(url)")]),e._v(" line. Internally Camel would assert your message body against your original.")]),e._v(" "),a("p",[e._v("There are more options availabe from "),a("a",{attrs:{href:"http://camel.apache.org/dataset.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("DataSet"),a("OutboundLink")],1),e._v(" component\nthat you may explore.\n"),a("a",{attrs:{href:"http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Try it out with a Route"),a("OutboundLink")],1),e._v("\nand see it for yourself.")])])}),[],!1,null,null,null);t.default=n.exports}}]);