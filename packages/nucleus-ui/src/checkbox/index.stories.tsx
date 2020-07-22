import { action } from "@storybook/addon-actions";
import React from "react";
import { Checkbox } from ".";

export default {
  component: Checkbox,
  title: "Checkbox",
};

export const checkbox = () => {
  return (
    <Checkbox label="Label" name="checkbox" onChange={action("onChange")} />
  );
};
