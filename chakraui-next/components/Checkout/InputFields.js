import React from "react";
import { GridItem, Input, FormLabel } from "@chakra-ui/react";
const FormInput = ({ label, placeholder, name, variant }) => {
  return (
    <GridItem>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        name={name}
        variant={variant}
      />
    </GridItem>
  );
};

export default FormInput;
