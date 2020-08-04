import React from "react";
import { FieldsetProps } from "./types";

export function Fieldset({
  children,
  className = ""
}: React.PropsWithChildren<FieldsetProps>) {
  return (
    <fieldset className={`p-8 border border-gray-200 shadow-md ${className}`}>
      {children}
    </fieldset>
  );
}
