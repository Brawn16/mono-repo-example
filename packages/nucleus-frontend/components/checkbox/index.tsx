import React from "react";
import { CheckboxProps } from "./types";

export function Checkbox(props: CheckboxProps): React.ReactElement {
  const { className, componentRef, label, name } = props;

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;

  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          {...inputProperties}
          ref={componentRef}
          className="w-5 h-5 mr-2 text-blue-600 form-checkbox"
          id={name}
          type="checkbox"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
}
