import React from "react";

import {
  Box,
  GridItem,
  Grid,
  Text,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { useCartState} from "../index.components";
import CartItems from "./CartItems";
import Link from "next/link";

const Cart = ({
  onClose,
  isOpen,
  onUpdateCart,
  onRemoveCartItem,
  onEmptyCart,
}) => {
  const { line_items, subtotal, total_items } = useCartState();

  const cartIsEmpty = !line_items.length;

  const CartItemsFilled = () => {
    return (
      <Box>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} spacing={4} w="100%">
          {line_items.map((item) => (
            <GridItem key={item.id}>
              <CartItems
                cartIitem={item}
                onRemoveCartItem={onRemoveCartItem}
                onUpdateCart={onUpdateCart}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  };

  const CartDrawer = () => {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent
          overflow="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              overflow: "hidden"
            },
          }}
        >
          <DrawerHeader borderBottomWidth="1px" mr={4}>
            {cartIsEmpty
              ? " Your cart is empty, add some items to get started"
              : " Your Shopping Cart"}
          </DrawerHeader>
          <DrawerCloseButton />
          {cartIsEmpty ? null : (
            <Box>
              <DrawerBody>
                <CartItemsFilled />
                <Text fontWeight="semibold" m={4}>
                  Total Quantity: {total_items}
                </Text>
                <Text fontWeight="semibold" m={4}>
                  Subtotal: {subtotal.formatted_with_symbol}
                </Text>
              </DrawerBody>
              <DrawerFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => onEmptyCart()}
                  >
                    Empty Cart
                  </Button>
                  <Link  href='/checkout'>
                    <Button variant="outline" colorScheme="blue">
                      Checkout
                    </Button>
                  </Link>
                </ButtonGroup>
              </DrawerFooter>
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <Box p={6}>
      <CartDrawer />
    </Box>
  );
};

export default Cart;
