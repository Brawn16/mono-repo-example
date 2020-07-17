import React from "react";
import { Checkbox } from ".";

export default {
  component: Checkbox,
  title: "Checkbox"
};

export const basicCheckbox = () => {
  return <Checkbox label="item" name="check" />;
};
