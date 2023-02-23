import {
  Image,
  Heading,
  Flex,
  Box,
  IconButton,
  Spacer,
  Badge,

} from "@chakra-ui/react";
import React from "react";

import { MdShoppingCart } from "react-icons/md";

const Navbar = ({ onOpen, totalItems}) => {



  return (
    <Box  pos='fixed' top='0' zIndex={1} w="100%">
      <Flex as="nav" p={2} alignItems="center" bgColor="gray.400" mb={8}>
        <Image
          src="images/shoplogo.jpg"
          alt="Brand Logo"
          p={2}
          boxSize="60px"
          borderRadius="full"
        />

        <Heading as="h1" fontSize="2xl" color="#7d3a87">
          Sheley's Commerce
        </Heading>
        <Spacer />

        <Box>
          <IconButton
            aria-label="Shopping Cart"
            icon={<MdShoppingCart />}
            size="lg"
            variant="unstyled"
            color="white"
            fontSize="40px"
            _hover={{ color: "gray.200" }}
            onClick={onOpen}
          />
          <Badge pos='absolute' top='2' right='3' fontSize='10px' colorScheme='red'  borderRadius='full'>{totalItems}</Badge>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
