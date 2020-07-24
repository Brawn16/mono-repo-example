import React from "react";
import { InputError } from "../input-error";
import { Label } from "../label";
import { TextareaProps } from "./types";

export function Textarea(props: TextareaProps): React.ReactElement {
  const { className, componentRef, error, label, name, required } = props;

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "pr-10 text-red-600 border-red-600 focus:border-red-600";
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
        {...textareaProperties}
        ref={componentRef}
        className={`block w-full form-input rounded-none text-gray-900 focus:shadow-none focus:border-blue-500 ${errorClassName}`}
        id={name}
      />
      {error && <InputError error={error} />}
    </div>
  );
}
