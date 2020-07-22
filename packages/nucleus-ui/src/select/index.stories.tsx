import { action } from "@storybook/addon-actions";
import React from "react";
import { Select } from ".";

export default {
  component: Select,
  title: "Select",
};

const options = [
  { label: "Great Britain", value: "Great Britain" },
  { label: "France", value: "France" },
  { label: "Spain", value: "Spain" },
  { label: "Germany", value: "Germany" },
];

export const select = () => {
  return (
    <Select
      label="Country"
      name="country"
      onChange={action("onChange")}
      options={options}
    />
  );
};
