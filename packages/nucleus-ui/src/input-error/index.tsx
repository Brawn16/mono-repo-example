import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { InputErrorProps } from "./types";

export function InputError({ error }: InputErrorProps) {
  return (
    <div className="flex items-center mt-1 text-red-600">
      <FaExclamationCircle className="w-3 h-3" />
      <p className="ml-1 text-xs">{error.message}</p>
    </div>
  );
}
