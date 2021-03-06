import React from "react";
import { InputError } from "../input-error";
import { InputHelp } from "../input-help";
import { Label } from "../label";
import { TextareaProps } from "./types";

export function Textarea(props: TextareaProps) {
  const { className, componentRef, error, help, label, name, required } = props;

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "text-red-600 border-red-600 focus:border-red-600";
  }

  // Build props to pass to textarea
  const textareaProperties = { ...props };
  delete textareaProperties.className;
  delete textareaProperties.componentRef;
  delete textareaProperties.error;
  delete textareaProperties.required;

  return (
    <div className={className}>
      {label && <Label label={label} name={name} required={required} />}
      <textarea
        rows={5}
        {...textareaProperties}
        ref={componentRef}
        className={`block w-full form-input rounded-none text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName}`}
        id={name}
      />
      {help && error === undefined && <InputHelp help={help} />}
      {error && <InputError error={error} />}
    </div>
  );
}
