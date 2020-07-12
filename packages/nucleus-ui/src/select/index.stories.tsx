import { action } from "@storybook/addon-actions";
import React from "react";

import { Select } from ".";

export default {
  component: Select,
  title: "Select"
};

const selectOptions = [
  { label: "Great Britain", value: "Great Britain" },
  { label: "France", value: "France" },
  { label: "Spain", value: "Spain" },
  { label: "Germany", value: "Germany" }
];

const handleSelection = (value: any) => {
  action("on selection", value)(value);
};

export const basicSelect = () => {
  return (
    <Select
      hideSelectedOptions
      onChange={handleSelection}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};

export const MulitSelect = () => {
  return (
    <Select
      hideSelectedOptions
      isMulti
      onChange={handleSelection}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};

export const disabledSelect = () => {
  return (
    <Select
      hideSelectedOptions
      onChange={handleSelection}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};
