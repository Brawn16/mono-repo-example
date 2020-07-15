import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { InputProps } from "./types";

export function Input(props: InputProps): React.ReactElement {
  const {
    className,
    componentRef,
    error,
    label,
    name,
    required,
    iconType: Icon,
    positionIconLeft,
  } = props;

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

  const iconPostionClass: string = positionIconLeft ? "left-0" : "right-0";

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
          className={`block w-full form-input shadow-sm ${errorClassName} ${
            positionIconLeft ? " pl-8" : "pr-8"
          }`}
          id={name}
        />
        {Icon && (
          <div
            className={`absolute inset-y-0 flex items-center pl-3 pr-3 pointer-events-none ${iconPostionClass}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center p-1 ">
          <FaExclamationCircle className="w-4 h-4 text-red-500" />
          <p className="mt-1 mb-1 ml-1 text-xs text-red-600">{error.message}</p>
        </div>
      )}
    </div>
  );
}
