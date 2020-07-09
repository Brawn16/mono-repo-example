import React from "react";
import { FieldSet } from ".";

export default {
  component: FieldSet,
  title: "Field Set",
};

export const fieldSet = () => (
  <FieldSet  heading='heading'>
     <p>item 1</p>
     <p>item 2</p>
  </FieldSet>
);
