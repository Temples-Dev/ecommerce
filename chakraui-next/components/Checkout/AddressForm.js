import React, { useState,useEffect } from "react";

import { useForm } from "react-hook-form";
import FormInput from "./InputFields";
import {
  FormErrorMessage,
  FormControl,
  Text,
  Grid,
  GridItem,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { commerce } from "../../lib/commerce";

const AddressFormComponent = ({ checkoutToken }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippinngCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    fetchShippinngCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return (
    <>
      <Text fontWeight="bold" p={4}>
        Shipping Address
      </Text>
      <form onSubmit={""}>
        <FormControl isRequired>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
            <FormInput name="email" label="Email" placeholder="Email" />
            <FormInput name="address" label="Address" placeholder="Address" />
            <FormInput name="city" label="City" placeholder="City" />
            {/* select area-lable */}
            <GridItem>
              <FormLabel htmlFor="option1">Shipping Country</FormLabel>
              <Select
                onChange={(e) => setShippingCountry(e.target.value)}
                placeholder="Shipping Country"
                value={shippingCountry}
              >
                {countries.map((country) => (
                  <option value={country.id} key={country.id}>
                    {country.label}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <FormLabel htmlFor="option2">Shipping Subdivision</FormLabel>
              <Select
                onChange={(e) => setShippingSubdivision(e.target.value)}
                placeholder="Shipping Division"
                value={shippingSubdivision}
              >
                {subdivisions.map((subdivision) => (
                  <option value={subdivision.id} key={subdivision.id}>
                    {subdivision.label}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <FormLabel htmlFor="option3">Shipping Option</FormLabel>
              <Select onChange={""} placeholder="Shipping Option">
                <option value="option3">Option 3</option>
              </Select>
            </GridItem>
          </Grid>
        </FormControl>
      </form>
    </>
  );
};

export default AddressFormComponent;
