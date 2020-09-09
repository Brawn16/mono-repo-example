import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { InputErrorProps } from "./types";

export function InputError({ error }: InputErrorProps) {
  return (
    <div className="flex items-center mt-1 text-red-600">
      <AiOutlineWarning className="w-4 h-4" />
      <p className="ml-1 text-xs">{error.message}</p>
    </div>
  );
}
