import React from "react";
import { InputError } from "../input-error";
import { CheckboxProps } from "./types";

export function Checkbox(props: CheckboxProps) {
  const { className, componentRef, error, label, name } = props;

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;

  return (
    <div className={className}>
      <div className="flex">
        <input
          {...inputProperties}
          ref={componentRef}
          className="w-8 h-8 mr-3 text-blue-600 rounded outline-none form-checkbox focus:border-blue-500 focus:shadow-none"
          id={name}
          type="checkbox"
        />
        <label className="mt-1" htmlFor={name}>
          {label}
        </label>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
