import React from "react";
import { Input } from "../input";
import { Fieldset } from ".";

export default {
  component: Fieldset,
  title: "Fieldset",
};

export function fieldset() {
  return (
    <Fieldset>
      <Input label="Input" name="input" />
    </Fieldset>
  );
}

export function customClass() {
  return (
    <Fieldset className="bg-blue-50">
      <Input label="Input" name="input" />
    </Fieldset>
  );
}
