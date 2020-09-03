import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { InputHelpProps } from "./types";

export function InputHelp({ help }: InputHelpProps) {
  return (
    <div className="flex items-center mt-1 text-gray-500">
      <FaInfoCircle className="w-3 h-3" />
      <p className="ml-1 text-xs">{help}</p>
    </div>
  );
}
