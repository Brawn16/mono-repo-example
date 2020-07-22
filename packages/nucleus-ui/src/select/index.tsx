import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { SelectProps, SelectOption } from "./types";

function renderOptions(options: SelectOption[]) {
  return options.map(({ label, value }: SelectOption) => (
    <option value={value}>{label}</option>
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
  delete selectProperties.required;

  return (
    <div className={className}>
      <label className="block text-gray-600" htmlFor={name}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <select
        {...selectProperties}
        ref={componentRef}
        className={`block w-full form-input rounded-none text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName}`}
        id={name}
      >
        {renderOptions(options)}
      </select>
      {error && (
        <div className="flex items-center p-1 text-red-600">
          <FaExclamationCircle className="w-3 h-3" />
          <p className="mt-1 mb-1 ml-1 text-xs">{error.message}</p>
        </div>
      )}
    </div>
  );
}
