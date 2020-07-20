import React from "react";

export function Fieldset({
  children,
  className,
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  >
>) {
  return (
    <fieldset className={`p-2 border border-gray-200 ${className}`}>
      {children}
    </fieldset>
  );
}
