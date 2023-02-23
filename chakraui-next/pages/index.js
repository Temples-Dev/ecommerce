import { Box, useDisclosure } from "@chakra-ui/react";
import {
  Navbar,
  Products,
  Cart,
  useCartDispatch,
  useCartState,
} from "../components/index.components";
import { commerce } from "../lib/commerce";



export default function Home({ products }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { total_items } = useCartState();

  const { setCart } = useCartDispatch();

  const handleAddToCart = async (productId) => {
    try {
      const updatedCart = await commerce.cart.add(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const handlUpdateCart = async (lineItemId, quantity) => {

    try {
      const updatedCart = await commerce.cart.update(lineItemId, { quantity });
      setCart(updatedCart);

    } catch (error) {
      console.error(error);
    }

    // console.log("I am",lineItemId);

  };

  const handleRemoveCartItem = async (lineItemId) => {
    try {
      const updatedCart = await commerce.cart.remove(lineItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const updatedCart = await commerce.cart.empty();
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg="white">
      <Navbar totalItems={total_items} onOpen={onOpen} />
      <Products products={products} onAddToCart={handleAddToCart} />
      <Cart
        isOpen={isOpen}
        onClose={onClose}
        onUpdateCart={handlUpdateCart}
        onRemoveCartItem={handleRemoveCartItem}
        onEmptyCart={handleEmptyCart}
      />
    </Box>
  );
}

export async function getStaticProps() {
  const { data: products } = await commerce.products.list(); //get all products

  return {
    props: {
      products,
    },
  };
}
