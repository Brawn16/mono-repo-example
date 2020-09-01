import React from "react";
import { RadioButtonProps } from "./types";

export const RadioButton = (props: RadioButtonProps) => {
  const { checked, label } = props;
  let radioButton = <div className="w-8 h-8 border rounded-full" />;

  if (checked) {
    radioButton = (
      <div className="flex items-center justify-center w-8 h-8 border rounded-full">
        <div className="w-4 h-4 bg-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <label className="flex items-center">
      <input className="absolute invisible" type="radio" {...props} />
      {radioButton}
      <span className="ml-3">{label}</span>
    </label>
  );
};
