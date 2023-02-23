import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Product from "./Product";

const Products = ({ products, onAddToCart }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={10} m={10} p={5} mt="100px">
      {products.map((product) => (
        <GridItem key={product.id}>
          <Product product={product} onAddToCart={onAddToCart} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Products;
