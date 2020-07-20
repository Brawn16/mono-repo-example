import React from "react";
import { RadioButtonTypes } from "./types";

export const RadioButton = (props: RadioButtonTypes) => {
  const { checked, label } = props;

  const renderRadioButton = checked ? (
    <div className="absolute flex items-center justify-center w-4 h-4 mt-1 bg-blue-600 rounded-full">
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  ) : (
    <div className="absolute w-4 h-4 mt-1 bg-gray-300 rounded-full" />
  );

  return (
    <label className="relative flex">
      <input className=" absolute opacity-0" {...props} type="radio" />
      {renderRadioButton}
      <span className=" ml-6">{label}</span>
    </label>
  );
};
