import React from "react";
import { ButtonProps } from "./types";

export function Button({
  children,
  className = "",
  iconType: Icon,
}: React.PropsWithChildren<ButtonProps>): React.ReactElement {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 shadow-sm focus:outline-none rounded-md hover:bg-blue-500 focus:shadow-outline-blue active:bg-blue-700 duration-150 ease-in-out transition ${className}`}
      type="submit"
    >
      {Icon && (
        <Icon className="w-4 h-4 mr-2 text-white opacity-50 duration-150 ease-in-out transition" />
      )}
      {children}
    </button>
  );
}
