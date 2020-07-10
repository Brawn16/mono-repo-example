import React from "react";
import { Input } from "../input";
import { FieldSet } from ".";

export default {
  component: FieldSet,
  title: "Field Set",
};

export const fieldSet = () => (
  <FieldSet heading="Field Title">
    <Input label="Input 1" name="input1" />
    <Input label="Input 2" name="input2" />
  </FieldSet>
);
