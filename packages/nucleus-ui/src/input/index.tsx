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
    positionIconLeft
  } = props;
  const iconPostionClass = positionIconLeft ? "left-0" : "right-0";

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "pr-10 text-red-600 border-red-600 focus:border-red-600";
  }

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;
  delete inputProperties.error;
  delete inputProperties.required;


  const iconPostionClass: string = positionIconLeft ? "left-0" : "right-0";
  const labelPadding = label ? "mt-1" : "";


  return (
    <div className={className}>
      <label className="block text-gray-600" htmlFor={name}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>

      <div className={`relative ${labelPadding} rounded-md`}>

        <input
          {...inputProperties}
          ref={componentRef}
          className={`block w-full form-input rounded-none text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName} ${
            positionIconLeft ? " pl-10" : "pr-10"
          }`}
          id={name}
        />
        {Icon && (
          <div
            className={`absolute inset-y-0 flex items-center pl-3 pr-3 pointer-events-none ${iconPostionClass}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center p-1 text-red-600">
          <FaExclamationCircle className="w-3 h-3" />
          <p className="mt-1 mb-1 ml-1 text-xs">{error.message}</p>
        </div>
      )}
    </div>
  );
}
