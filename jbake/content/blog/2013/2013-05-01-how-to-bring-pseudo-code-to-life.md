title=How to bring pseudo code to life
date=2013-05-01
type=post
status=published
~~~~~~

When designing a piece of software, I like to start with some pseudo code first, then work my way out. I tend to try mapping out the normal workflow (one that runs without any corner cases) with high level of actions as series of steps. Then the detailed implementation of the code can be filled in at later time.

Now with Java, you can easily do this with pseudo code, bring it to life, and still make it very maintainable. Try this out.

    package deng.javademo;
    
    /**
     * @author Zemian Deng
     */
    public class PseudoCodeToLife {
        public static void main(String[] args) {
            CreditCardProcessor creditCardProcessor = new CreditCardProcessor()
                    .step(webServiceRequest())
                    .step(validateCardNumber())
                    .step(validateSecurityCode())
                    .step(checkAvailableCredit())
                    .step(chargeCard())
                    .step(webServiceResponse());
    
            creditCardProcessor.run();
        }
    }
    

Now that's as high level as you can get, but it still let me fill in the implementation without losing the overall requirement flow. To implement such workflow, we need a contract that allow processor to move data from one step to another, and yet it needs to perform some action along the way. How about an interface like this.

    package deng.javademo;
    
    /**
     * @author Zemian Deng
     */
    public interface StepAction {
        public void onAction(Exchange exchange);
    }
    

Next is how to wire steps together. For now we can just do it inside `CreditCardProcessor`, but you can easily abstract that into a re-usable base class.

    package deng.javademo;
    
    import java.util.ArrayList;
    import java.util.List;
    
    /**
     * @author Zemian Deng
     */
    public class CreditCardProcessor {
        List<StepAction> steps = new ArrayList<StepAction>();
    
        public CreditCardProcessor step(StepAction stepAction) {
            steps.add(stepAction);
            return this;
        }
    
        public void run() {
            Exchange exchange = new Exchange();
            for (StepAction step : steps) {
                step.onAction(exchange);
            }
        }
    }
    

Pretty straight forward. Here I used an `Exchange` as message, passing between each steps to allow the workflow to exchange data. You can wrap just about any real payload and/or add a Map of header properties.

Now what we are missing is just filling in each step of actions. Since we have an explicit step name when defining the workflow, we can just generate these method and fill in the actions per step required. I will add them all inside the `PseudoCodeToLife` and reprint it here.

    package deng.javademo;
    
    /**
     * @author Zemian Deng
     */
    public class PseudoCodeToLife {
        public static void main(String[] args) {
            CreditCardProcessor creditCardProcessor = new CreditCardProcessor()
                    .step(webServiceRequest())
                    .step(validateCardNumber())
                    .step(validateSecurityCode())
                    .step(checkAvailableCredit())
                    .step(chargeCard())
                    .step(webServiceResponse());
    
            creditCardProcessor.run();
        }
    
        private static StepAction webServiceRequest() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("webServiceRequest step.");
                }
            };
        }
    
        private static StepAction validateCardNumber() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("validateCardNumber step.");
                }
            };
        }
    
        private static StepAction validateSecurityCode() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("validateSecurityCode step.");
                }
            };
        }
    
        private static StepAction checkAvailableCredit() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("checkAvailableCredit step.");
                }
            };
        }
    
        private static StepAction chargeCard() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("chargeCard step.");
                }
            };
        }
    
        private static StepAction webServiceResponse() {
            return new StepAction() {
                @Override
                public void onAction(Exchange exchange) {
                    System.out.println("webServiceResponse step.");
                }
            };
        }
    }
    

That's all to this. What do you think? I think it's a simple way to tackle business problems. Simple software make less bugs and easier to maintain.