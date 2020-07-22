import { action } from "@storybook/addon-actions";
import React from "react";

import { Select } from ".";

export default {
  component: Select,
  title: "Select",
};

const selectOptions = [
  { label: "Great Britain", value: "Great Britain" },
  { label: "France", value: "France" },
  { label: "Spain", value: "Spain" },
  { label: "Germany", value: "Germany" },
];

export const basicSelect = () => {
  return (
    <Select
      label="Select Country"
      name="select"
      onChange={action("onChange")}
      options={selectOptions}
    />
  );
};

export const mulitSelect = () => {
  return (
    <Select
      hideSelectedOptions
      isMulti
      label="Select Countries"
      name="select"
      onChange={action("onChange")}
      options={selectOptions}
    />
  );
};

export const disabledSelect = () => {
  return (
    <Select
      isDisabled
      label="Select Country"
      name="select"
      onChange={action("onChange")}
      options={selectOptions}
    />
  );
};
