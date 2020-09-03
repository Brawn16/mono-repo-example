import React from "react";
import { InputError } from "../input-error";
import { checkbox, toggle, toggleHandle } from "./index.module.css";
import { ToggleProps } from "./types";

export function Toggle(props: ToggleProps) {
  const { className, componentRef, error, label, name } = props;

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;

  return (
    <div className={className}>
      <label className="block text-gray-600" htmlFor={name}>
        {label}
        <input
          {...inputProperties}
          ref={componentRef}
          className={checkbox}
          id={name}
          type="checkbox"
        />
        <div className={toggle}>
          <span className={toggleHandle} />
        </div>
      </label>
      {error && <InputError error={error} />}
    </div>
  );
}
