import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { InputProps } from "./types";

export function Input(props: InputProps): React.ReactElement {
  const { className, componentRef, error, label, name, required } = props;

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName =
      "pr-10 text-red-900 border-red-300 focus:border-red-300 focus:shadow-outline-red";
  }

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;
  delete inputProperties.required;

  return (
    <div className={className}>
      <label className="block font-medium text-gray-700" htmlFor={name}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative mt-1 rounded-md">
        <input
          {...inputProperties}
          ref={componentRef}
          className={`block w-full form-input shadow-sm ${errorClassName}`}
          id={name}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
