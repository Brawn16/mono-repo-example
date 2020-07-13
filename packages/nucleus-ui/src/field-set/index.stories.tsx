import React from "react";
import { Input } from "../input";
import { Fieldset } from ".";

export default {
  component: Fieldset,
  title: "Fieldset"
};

export function fieldSet() {
  return (
    <Fieldset>
      <Input label="Input 1" name="input1" />
      <Input label="Input 2" name="input2" />
    </Fieldset>
  );
}
