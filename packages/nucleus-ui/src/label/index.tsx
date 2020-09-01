import React from "react";
import { LabelProps } from "./types";

export function Label({
  label,
  name,
  required,
}: LabelProps): React.ReactElement {
  return (
    <label className="block mb-1 font-extrabold" htmlFor={name}>
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>
  );
}
