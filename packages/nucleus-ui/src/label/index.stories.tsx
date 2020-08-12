import React from "react";
import { Label } from ".";

export default {
  component: Label,
  title: "Label"
};

export const basicLabel = () => {
  return <Label label="Label" name="label" />;
};

export const required = () => {
  return <Label label="Label" name="label" required />;
};
