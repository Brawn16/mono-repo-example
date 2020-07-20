import React from "react";
import { RadioInputTypes } from "./types";

export const RadioButton = (props: RadioInputTypes) => {
  const { checked, onClick, label, value } = props;

  const renderRadioButton = checked ? (
    <div className="absolute flex items-center justify-center w-4 h-4 mt-1 bg-blue-600 rounded-full">
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  ) : (
    <div className="absolute w-4 h-4 mt-1 bg-gray-300 rounded-full" />
  );

  return (
    <label className="relative flex">
      <input
        className=" absolute opacity-0"
        defaultChecked
        onClick={onClick}
        type="radio"
        value={value}
      />
      {renderRadioButton}
      <span className=" ml-6">{label}</span>
    </label>
  );
};
