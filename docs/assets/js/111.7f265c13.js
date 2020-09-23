(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{493:function(e,o,t){"use strict";t.r(o);var n=t(10),r=Object(n.a)({},(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("The Apache Camel allows you to create multiple "),t("code",[e._v("Route")]),e._v("'s within a single "),t("code",[e._v("CamelContext")]),e._v(" space. The "),t("code",[e._v("direct")]),e._v(" component in Camel would allow you to bridge messages between these "),t("code",[e._v("Route")]),e._v("'s. To demonstrate this, I will create few routes and pass messages between them.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('package camelcoredemo;\n\nimport org.slf4j.*;\nimport org.apache.camel.*;\nimport org.apache.camel.builder.*;\nimport org.apache.camel.main.Main;\nimport java.io.*;\n\npublic class DirectDemoCamel extends Main {\n    static Logger LOG = LoggerFactory.getLogger(DirectDemoCamel.class);\n    public static void main(String[] args) throws Exception {\n        DirectDemoCamel main = new DirectDemoCamel();\n        main.enableHangupSupport();\n        main.addRouteBuilder(createRouteBuilder1());\n        main.addRouteBuilder(createRouteBuilder2());\n        main.addRouteBuilder(createRouteBuilder3());\n        main.run(args);\n    }\n    // The file poller route\n    static RouteBuilder createRouteBuilder1() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("file://target/input?preMove=staging&move=.processed")\n                .process(new Processor() {\n                    public void process(Exchange msg) {\n                        CamelContext camelContext = msg.getContext();\n                        ProducerTemplate producer = camelContext.createProducerTemplate();\n                        File file = msg.getIn().getBody(File.class);\n                        boolean specialFile = file.getName().endsWith("_SPECIAL.dat");\n                        if (specialFile)\n                            producer.send("direct:specialRoute", msg);\n                        else\n                            producer.send("direct:normalRoute", msg);\n                    }\n                });\n            }\n        };\n    }\n    // The special file processing route\n    static RouteBuilder createRouteBuilder2() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("direct:specialRoute")\n                .process(new Processor() {\n                    public void process(Exchange msg) {\n                        LOG.info("Processing special file: " + msg);\n                    }\n                });\n            }\n        };\n    }\n    // The normal file processing route\n    static RouteBuilder createRouteBuilder3() {\n        return new RouteBuilder() {\n            public void configure() {\n                from("direct:normalRoute")\n                .process(new Processor() {\n                    public void process(Exchange msg) {\n                        LOG.info("Processing normal file: " + msg);\n                    }\n                });\n            }\n        };\n    }\n}\n')])])]),t("p",[e._v("Here I have created 3 "),t("code",[e._v("Route")]),e._v("'s and re-used the "),t("code",[e._v("file")]),e._v(" component I have introduced in the past. The first "),t("code",[e._v("Route")]),e._v(" polls a directory, and then based on the name of the file found, we send it to either to "),t("strong",[e._v("special")]),e._v(" or "),t("strong",[e._v("normal")]),t("code",[e._v("Route")]),e._v(" for processing. Because these "),t("code",[e._v("Route")]),e._v("'s are separated, we need a bridge channel to pass the messages through, hence it's what the "),t("code",[e._v("direct")]),e._v(" component does. The usage is simply use any "),t("strong",[e._v("unique name")]),e._v(" within the "),t("code",[e._v("CamelContext")]),e._v(", and it will serve as a direct memory queue to pass messages. You may read from or send to these queues. So as you can see, the "),t("code",[e._v("direct")]),e._v(" component let you easily breakup a complex route workflow into smaller part.")]),e._v(" "),t("p",[e._v("In above demo, I have also introduced a bit of Camel core features: "),t("code",[e._v("ProducerTemplate")]),e._v(". Within a "),t("code",[e._v("CamelContext")]),e._v(" you may create an instance of "),t("code",[e._v("ProducerTemplate")]),e._v(" and it will allow you to send any messages to any endpoints dynamically at runtime. Usually you would probably want to store this producer object as member field instead of per each message processing. But for demo purpose, I will leave it as simple as that, and leave you as exercise to explore more on your own.")]),e._v(" "),t("p",[e._v("There are more options availabe from "),t("a",{attrs:{href:"http://camel.apache.org/direct.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Direct"),t("OutboundLink")],1),e._v(" component\nthat you may explore.\n"),t("a",{attrs:{href:"http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Try it out with a Route"),t("OutboundLink")],1),e._v("\nand see it for yourself.")])])}),[],!1,null,null,null);o.default=r.exports}}]);