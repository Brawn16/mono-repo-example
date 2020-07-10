import React from "react";
import { FieldSetProps } from "./types";

export function FieldSet({
  children,
  heading,
}: React.PropsWithChildren<FieldSetProps>) {
  return (
    <fieldset>
      <legend>{heading}</legend>
      <div>{children}</div>
    </fieldset>
  );
}
