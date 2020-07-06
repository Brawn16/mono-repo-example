import React from "react";
import { checkbox, toggle, toggleHandle } from "./index.module.css";
import { ToggleProps } from "./types";

export function Toggle(props: ToggleProps): React.ReactElement {
  const { className, componentRef, label, name } = props;

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.componentRef;

  return (
    <div className={className}>
      <label className="block font-medium text-gray-700" htmlFor={name}>
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
    </div>
  );
}
