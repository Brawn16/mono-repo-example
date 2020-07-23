import React from "react";
import { InputError } from "../input-error";
import { CheckboxProps } from "./types";

export function Checkbox(props: CheckboxProps): React.ReactElement {
  const { className, componentRef, error, label, name } = props;

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;

  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          {...inputProperties}
          ref={componentRef}
          className="w-5 h-5 mr-2 text-blue-600 rounded-none outline-none form-checkbox focus:border-blue-500 focus:shadow-none"
          id={name}
          type="checkbox"
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
