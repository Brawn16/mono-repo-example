import React from "react";
import { ButtonProps } from "./types";

export function Button(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children, className = "bg-blue-700", iconType: Icon } = props;

  return (
    <button
      type="submit"
      {...props}
      className={`flex items-center justify-center px-4 py-2 font-medium text-white  shadow-sm focus:outline-none rounded-md hover:bg-blue-600 focus:shadow-outline-blue active:bg-blue-800 duration-150 ease-in-out transition ${className}`}
    >
      {Icon && (
        <Icon className="w-4 h-4 mr-2 text-white opacity-50 duration-150 ease-in-out transition" />
      )}
      {children}
    </button>
  );
}
