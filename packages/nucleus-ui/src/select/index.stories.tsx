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

export const basicSelect = () => {
  return (
    <Select
      hideSelectedOptions
      onChange={action("onChange")}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};

export const mulitSelect = () => {
  return (
    <Select
      hideSelectedOptions
      isMulti
      onChange={action("onChange")}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};

export const disabledSelect = () => {
  return (
    <Select
      hideSelectedOptions
      isDisabled
      onChange={action("onChange")}
      options={selectOptions}
      placeholder="please select country"
    />
  );
};
