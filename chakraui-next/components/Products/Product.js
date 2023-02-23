"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const Product = ({ product, onAddToCart }) => {
  const toast = useToast();
  const alertToast = () => {
    toast({
      title: `${product.name}`,
      description: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card maxW="sm" variant="filled" boxShadow="2xl">
      <CardBody>
        <Image
          src={product.image.url}
          alt={product.name}
          borderRadius="lg"
          boxSize="300px"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          {isMounted ? (
            <Text
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          ) : null}
          <Text color="blue.600" fontSize="2xl">
            {product.price.formatted_with_symbol}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              setLoading(true);
              onAddToCart(product.id);
              alertToast();
              setTimeout(() => {
                setLoading(false);
              }, [1000]);
            }}
          >
            {loading ? <Spinner mx={3} /> : null}
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Product;
