(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{475:function(e,t,n){"use strict";n.r(t);var a=n(10),i=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("When designing a piece of software, I like to start with some pseudo code first, then work my way out. I tend to try mapping out the normal workflow (one that runs without any corner cases) with high level of actions as series of steps. Then the detailed implementation of the code can be filled in at later time.")]),e._v(" "),n("p",[e._v("Now with Java, you can easily do this with pseudo code, bring it to life, and still make it very maintainable. Try this out.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("    package deng.javademo;\n    \n    /**\n     * @author Zemian Deng\n     */\n    public class PseudoCodeToLife {\n        public static void main(String[] args) {\n            CreditCardProcessor creditCardProcessor = new CreditCardProcessor()\n                    .step(webServiceRequest())\n                    .step(validateCardNumber())\n                    .step(validateSecurityCode())\n                    .step(checkAvailableCredit())\n                    .step(chargeCard())\n                    .step(webServiceResponse());\n    \n            creditCardProcessor.run();\n        }\n    }\n")])])]),n("p",[e._v("Now that's as high level as you can get, but it still let me fill in the implementation without losing the overall requirement flow. To implement such workflow, we need a contract that allow processor to move data from one step to another, and yet it needs to perform some action along the way. How about an interface like this.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("    package deng.javademo;\n    \n    /**\n     * @author Zemian Deng\n     */\n    public interface StepAction {\n        public void onAction(Exchange exchange);\n    }\n")])])]),n("p",[e._v("Next is how to wire steps together. For now we can just do it inside "),n("code",[e._v("CreditCardProcessor")]),e._v(", but you can easily abstract that into a re-usable base class.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("    package deng.javademo;\n    \n    import java.util.ArrayList;\n    import java.util.List;\n    \n    /**\n     * @author Zemian Deng\n     */\n    public class CreditCardProcessor {\n        List<StepAction> steps = new ArrayList<StepAction>();\n    \n        public CreditCardProcessor step(StepAction stepAction) {\n            steps.add(stepAction);\n            return this;\n        }\n    \n        public void run() {\n            Exchange exchange = new Exchange();\n            for (StepAction step : steps) {\n                step.onAction(exchange);\n            }\n        }\n    }\n")])])]),n("p",[e._v("Pretty straight forward. Here I used an "),n("code",[e._v("Exchange")]),e._v(" as message, passing between each steps to allow the workflow to exchange data. You can wrap just about any real payload and/or add a Map of header properties.")]),e._v(" "),n("p",[e._v("Now what we are missing is just filling in each step of actions. Since we have an explicit step name when defining the workflow, we can just generate these method and fill in the actions per step required. I will add them all inside the "),n("code",[e._v("PseudoCodeToLife")]),e._v(" and reprint it here.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('    package deng.javademo;\n    \n    /**\n     * @author Zemian Deng\n     */\n    public class PseudoCodeToLife {\n        public static void main(String[] args) {\n            CreditCardProcessor creditCardProcessor = new CreditCardProcessor()\n                    .step(webServiceRequest())\n                    .step(validateCardNumber())\n                    .step(validateSecurityCode())\n                    .step(checkAvailableCredit())\n                    .step(chargeCard())\n                    .step(webServiceResponse());\n    \n            creditCardProcessor.run();\n        }\n    \n        private static StepAction webServiceRequest() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("webServiceRequest step.");\n                }\n            };\n        }\n    \n        private static StepAction validateCardNumber() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("validateCardNumber step.");\n                }\n            };\n        }\n    \n        private static StepAction validateSecurityCode() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("validateSecurityCode step.");\n                }\n            };\n        }\n    \n        private static StepAction checkAvailableCredit() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("checkAvailableCredit step.");\n                }\n            };\n        }\n    \n        private static StepAction chargeCard() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("chargeCard step.");\n                }\n            };\n        }\n    \n        private static StepAction webServiceResponse() {\n            return new StepAction() {\n                @Override\n                public void onAction(Exchange exchange) {\n                    System.out.println("webServiceResponse step.");\n                }\n            };\n        }\n    }\n')])])]),n("p",[e._v("That's all to this. What do you think? I think it's a simple way to tackle business problems. Simple software make less bugs and easier to maintain.")])])}),[],!1,null,null,null);t.default=i.exports}}]);