import React from 'react'
import { Box, Circle, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { Quotee } from './Quotee'
import { QuoteIcon } from './QuoteIcon'



const Testimonials = () => (
  <Box as="section" bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box
      maxW="3xl"
      mx="auto"
      px={{
        base: '6',
        md: '8',
      }}
      pt="12"
      pb="16"
    >
      <Flex direction="column" align="center" textAlign="center">
        <QuoteIcon
          color={useColorModeValue('gray.300', 'gray.600')}
          fontSize={{
            base: '3xl',
            md: '6xl',
          }}
        />
        <Text
          fontSize={{
            base: 'xl',
            md: '2xl',
          }}
          fontWeight="medium"
          mt="6"
        >
          &ldquo;{/*render the testimony*/}&rdquo;
        </Text>
        <Quotee
          name=""
          jobTitle=""
          imageSrc=""
        />
      </Flex>
      <HStack justify="center" spacing="4" mt="8" color={useColorModeValue('gray.300', 'gray.600')}>
        <Circle size="3" bg="blue.500" />
        <Circle size="2" bg="currentColor" />
        <Circle size="2" bg="currentColor" />
      </HStack>
    </Box>
  </Box>
)

export default Testimonials