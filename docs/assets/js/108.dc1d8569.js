(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{490:function(e,o,t){"use strict";t.r(o);var a=t(10),n=Object(a.a)({},(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("There are many ways to log and inspect the messages as it pass through your\nCamel "),t("code",[e._v("Route")]),e._v(". The "),t("code",[e._v("camel-core")]),e._v(" comes with a "),t("code",[e._v("log")]),e._v(" component that let\nyou inspect the message. So instead of write a separate\n"),t("code",[e._v("Processor")]),e._v(" just to log a line as got processed, try using this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('from("timer://timer1?period=1s")\n.to("log:demo")\n')])])]),t("p",[e._v("By default, the "),t("code",[e._v("log")]),e._v(" component will record your message body content\nthrough your logger name, "),t("code",[e._v("demo")]),e._v(" in above case, at INFO level. Since you can give any\nname, you can control the logging LEVEL anyway you like through a Camel\n"),t("a",{attrs:{href:"http://saltnlight5.blogspot.com/2013/08/how-to-configure-slf4j-with-different.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("SLF4J logger implementation"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("To log the message in DEBUG level, try this")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('from("timer://timer1?period=1s")\n.to("log:demo?level=DEBUG")\n')])])]),t("p",[e._v("Now if you use "),t("code",[e._v("log4j")]),e._v(" as logger implementation, then ensure to add a\nlogger config like this.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("log4j.logger.demo = DEBUG\nlog4j.logger.org.apache.camel = INFO\n")])])]),t("p",[e._v("The Camel message may have Properties and Headers as well, so to display\nthese, you may add "),t("code",[e._v("showAll=true")]),e._v(".")]),e._v(" "),t("p",[e._v("When you process messages that have large body text, it might be more\npractical to just dislay certain number of characters. To do this, add\n"),t("code",[e._v("maxChars=256")]),e._v(" to URL.")]),e._v(" "),t("h2",{attrs:{id:"how-to-measure-camel-messages-throughput-rate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-measure-camel-messages-throughput-rate"}},[e._v("#")]),e._v(" How to measure Camel messages throughput rate")]),e._v(" "),t("p",[e._v("One of the hidden gem of the "),t("code",[e._v("log")]),e._v(" componet is its ability to log messages\nthroughput! You may specific group of messages to be logged, and once it\nreached that count, it will print the msgs/sec rate output. To enable\nthis, just add "),t("code",[e._v("groupSize")]),e._v(" option to URL.")]),e._v(" "),t("p",[e._v("To demo this, I will create a "),t("code",[e._v("SampleGenerator")]),e._v(" bean processor\nthat would flood the "),t("code",[e._v("Route")]),e._v(" with sample messages. I will use the Camel\ncontext registry to bind the bean, and then reference it in the "),t("code",[e._v("Route")]),e._v(". Here\nis the demo code.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('package camelcoredemo;\n\nimport org.slf4j.*;\nimport org.apache.camel.*;\nimport org.apache.camel.builder.*;\nimport org.apache.camel.main.Main;\n\npublic class LogDemoCamel extends Main {\n    static Logger LOG = LoggerFactory.getLogger(LogDemoCamel.class);\n    public static void main(String[] args) throws Exception {\n        LogDemoCamel main = new LogDemoCamel();\n        main.enableHangupSupport();\n        main.addRouteBuilder(createRouteBuilder());\n        main.bind("sampleGenerator", new SampleGenerator());\n        main.run(args);\n    }\n    static RouteBuilder createRouteBuilder() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("bean:sampleGenerator")\n                .to("log://demo?groupSize=100");\n            }\n        };\n    }\n    static class SampleGenerator implements Processor{\n        int count = 0;\n        public void process(Exchange msg) throws Exception {\n            if (count >= 500){\n                LOG.info("Max count has reached. Do nothing.");\n                Thread.sleep(Long.MAX_VALUE);\n                return;\n            }\n\n            // Let\'s generate sample message.\n            count++;\n            LOG.trace("Generating sample msg #{}", count);\n            msg.getOut().setBody("Sample msg");\n        }\n    }\n}\n')])])]),t("p",[e._v("Now you should able to compile and run this demo.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("mvn compile exec:java -Dexec.mainClass=camelcoredemo.LogDemoCamel\n")])])]),t("p",[e._v("When running this demo, you will notice the rate will be displayed on console\nand how fast you can pump message to "),t("code",[e._v("Route")]),e._v(" and to process it. This is a\nvery useful feature to help you measure and have a quick view on your "),t("code",[e._v("Route")]),e._v("'s\ncapability.")]),e._v(" "),t("p",[e._v("There are more options availabe from "),t("a",{attrs:{href:"http://camel.apache.org/log.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Log"),t("OutboundLink")],1),e._v(" component\nthat you may explore.\n"),t("a",{attrs:{href:"http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Try it out with a Route"),t("OutboundLink")],1),e._v("\nand see it for yourself.")])])}),[],!1,null,null,null);o.default=n.exports}}]);