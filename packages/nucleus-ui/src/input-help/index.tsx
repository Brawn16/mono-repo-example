import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { InputHelpProps } from "./types";

export function InputHelp({ help }: InputHelpProps) {
  return (
    <div className="flex mt-1 text-gray-500">
      <AiOutlineQuestionCircle className="flex-shrink-0 w-4 h-4 mt-1" />
      <p className="ml-1 text-sm">{help}</p>
    </div>
  );
}
