import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { InputHelpProps } from "./types";

export function InputHelp({ help }: InputHelpProps) {
  return (
    <div className="flex items-center mt-1 text-gray-500">
      <AiOutlineQuestionCircle className="w-4 h-4" />
      <p className="ml-1 text-sm">{help}</p>
    </div>
  );
}
