import React from "react";
import { InputError } from "../input-error";
import { InputHelp } from "../input-help";
import { Label } from "../label";
import { InputProps } from "./types";

export function Input(props: InputProps) {
  const {
    className,
    componentRef,
    error,
    help,
    label,
    name,
    required,
    iconType: Icon,
    positionIconLeft,
  } = props;
  const iconPostionClassName = positionIconLeft ? "left-0" : "right-0";

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "text-red-600 border-red-600 focus:border-red-600";
  }

  // Build icon classes
  let iconClassName = "";
  if (Icon) {
    iconClassName = positionIconLeft ? " pl-10" : " pr-10";
  }

  // Build props to pass to input
  const inputProperties = { ...props };
  delete inputProperties.className;
  delete inputProperties.componentRef;
  delete inputProperties.error;
  delete inputProperties.help;
  delete inputProperties.iconType;
  delete inputProperties.positionIconLeft;
  delete inputProperties.required;

  return (
    <div className={className}>
      {label && <Label label={label} name={name} required={required} />}
      <div className="relative">
        <input
          {...inputProperties}
          ref={componentRef}
          className={`block w-full form-input rounded text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName} ${iconClassName}`}
          id={name}
        />
        {Icon && (
          <div
            className={`absolute inset-y-0 flex items-center px-3 pointer-events-none ${iconPostionClassName}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {help && error === undefined && <InputHelp help={help} />}
      {error && <InputError error={error} />}
    </div>
  );
}
