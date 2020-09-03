import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
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
    placeholder = "Select an option...",
    required,
  } = props;

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "text-red-600 border-red-600 focus:border-red-600";
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
      <div className="relative">
        <select
          defaultValue=""
          {...selectProperties}
          ref={componentRef}
          className={`block w-full form-input rounded text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName}`}
          id={name}
        >
          <option hidden value="">
            {placeholder}
          </option>
          {renderOptions(options)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 pointer-events-none">
          <div>
            <FaCaretUp className="w-4 h-4 -mb-2" />
            <FaCaretDown className="w-4 h-4 -mt-2" />
          </div>
        </div>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
