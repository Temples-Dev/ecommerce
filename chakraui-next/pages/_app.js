import "../styles/globals.css";
import { Footer, CartProvider } from "../components/index.components";

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

// import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {

  const theme = extendTheme({
    components: {
      Steps,
    },
  });


  return (
    <ChakraProvider  theme={theme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <Footer />
    </ChakraProvider>
  );
}
