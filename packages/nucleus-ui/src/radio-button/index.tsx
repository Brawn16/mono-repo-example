import React from "react";
import { RadioButtonProps } from "./types";

export const RadioButton = (props: RadioButtonProps) => {
  const { checked, label } = props;
  let radioButton = (
    <div className="absolute w-4 h-4 mt-1 bg-gray-300 rounded-full" />
  );

  if (checked) {
    radioButton = (
      <div className="absolute flex items-center justify-center w-4 h-4 mt-1 bg-blue-600 rounded-full">
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    );
  }

  return (
    <label className="relative flex">
      <input className="absolute opacity-0" type="radio" {...props} />
      {radioButton}
      <span className="ml-6">{label}</span>
    </label>
  );
};
