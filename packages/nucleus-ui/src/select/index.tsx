import React from "react";
import { InputError } from "../input-error";
import { Label } from "../label";
import { SelectProps, SelectOption } from "./types";

function renderOptions(options: SelectOption[]) {
  return options.map(({ label, value }: SelectOption) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));
}

export function Select(props: SelectProps) {
  const {
    className,
    componentRef,
    error,
    label,
    name,
    options,
    required,
  } = props;

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "pr-10 text-red-600 border-red-600 focus:border-red-600";
  }

  // Build props to pass to input
  const selectProperties = { ...props };
  delete selectProperties.className;
  delete selectProperties.componentRef;
  delete selectProperties.error;
  delete selectProperties.options;
  delete selectProperties.required;

  return (
    <div className={className}>
      {label && <Label label={label} name={name} required={required} />}
      <select
        {...selectProperties}
        ref={componentRef}
        className={`block w-full form-input rounded-none text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName}`}
        id={name}
      >
        {renderOptions(options)}
      </select>
      {error && <InputError error={error} />}
    </div>
  );
}
