import React, { useEffect,  useState } from "react";

import {
  Card,
  Image,
  HStack,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const CartItems = ({ cartIitem, onUpdateCart, onRemoveCartItem }) => {
  const increaseQuantity = cartIitem.quantity + 1;
  const decreaseQuantity = cartIitem.quantity - 1;


  return (
    <Card maxW="container.lg" variant="filled">
      <CardBody>
        <HStack mt="6" spacing="3">
          <Image
            src={cartIitem.image.url}
            alt={cartIitem.name}
            borderRadius="md"
            boxSize="70px"
            objectFit="cover"
          />
          <Heading size="xs">{cartIitem.name}</Heading>
          <Text fontWeight="semibold"> Quantity:{cartIitem.quantity} </Text>
          <Text color="blue.600" fontWeight="semibold">
            Price: {cartIitem.price.formatted_with_symbol}
          </Text>
        </HStack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => onUpdateCart(cartIitem.id, increaseQuantity)}
            // ref={incdecRef}
          >
            Increase Quantity +
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => onUpdateCart(cartIitem.id, decreaseQuantity)}
            // ref={incdecRef}
          >
            Decrease Quantity -
          </Button>
          <Button
            variant="outline"
            colorScheme="cyan"
            onClick={() => onRemoveCartItem(cartIitem.id)}
          >
            Remove Item
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CartItems;
