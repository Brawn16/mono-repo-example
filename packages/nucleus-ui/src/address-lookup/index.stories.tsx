import { action } from "@storybook/addon-actions";
import React from "react";
import { AddressLookup } from ".";

export default {
  component: AddressLookup,
  title: "Address Lookup",
};

const callBackFunction = (address: any) => {
  action("address")(address);
};

export const onAddressSelect = () => (
  <AddressLookup onAddressSelect={callBackFunction} />
);
