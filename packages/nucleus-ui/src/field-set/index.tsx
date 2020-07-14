import React from "react";

export function Fieldset({
  children,
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >
>) {
  return <fieldset>{children}</fieldset>;
}
