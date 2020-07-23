import { action } from "@storybook/addon-actions";
import React from "react";
import { AddressLookup } from ".";

export default {
  component: AddressLookup,
  title: "Address Lookup"
};

export const addressLookup = () => (
  <AddressLookup onAddressSelect={action("onAddressSelect")} />
);
