import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Flex, Button, Heading, Container } from "@chakra-ui/react";
import { FiCheckCircle, FiDollarSign, FiUser } from "react-icons/fi";
import AddressFormComponent from "./AddressForm";
import PaymentFormComponent from "./PaymentForm";
import { useEffect, useState } from "react";
import { commerce } from "../../lib/commerce";
import { useCartDispatch } from "../index.components";

// console.log('i am cartdispatch=====>',{useCartDispatch});

const steps = [
  { label: "Shipping Address", icon: FiUser },
  { label: "Payment Details", icon: FiDollarSign },
];

const Checkout = () => {
  const { id } = useCartDispatch();

  console.log("cartId=======>", id);

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    const genetateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(id, {
          type: "cart",
        });

        console.log("generated token", token);
        setCheckoutToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    genetateToken();
  }, [id]);

  const Confirmation = () => {
    return <div>Confirmation</div>;
  };

  const Contents = () =>
    activeStep === 0 ? (
      <AddressFormComponent checkoutToken={checkoutToken} />
    ) : (
      <PaymentFormComponent />
    );

  return (
    <Container width="50%" mt={10} boxShadow="lg" borderRadius="lg">
      <Heading as="center" fontWeight="medium" py={4}>
        Checkout
      </Heading>
      <Flex flexDir="column" width="100%">
        <Steps checkIcon={FiCheckCircle} activeStep={activeStep}>
          {steps.map(({ label, icon }) => (
            <Step label={label} key={label} icon={icon}>
              {activeStep === steps.length ? (
                <Confirmation />
              ) : (
                checkoutToken && <Contents />
              )}
            </Step>
          ))}
        </Steps>

        {activeStep === steps.length ? (
          <Flex px={4} py={4} width="100%" flexDirection="column">
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>
            <Confirmation />
            <Button mx="auto" mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
          </Flex>
        ) : (
          <Flex width="100%" justify="flex-end">
            <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default Checkout;
