import React from "react";
import { ButtonProps } from "./types";

export function Button(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children, iconType: Icon, postionIconRight, disabled } = props;
  let {
    className = "bg-blue-700 hover:bg-blue-600 active:bg-blue-800",
  } = props;

  className +=
    " flex items-center justify-center px-4 py-2 font-medium text-white rounded-md  shadow-sm focus:outline-none duration-150 ease-in-out transition";
  if (disabled) {
    className += " opacity-50 cursor-not-allowed";
  }

  return (
    <button type="submit" {...props} className={className}>
      {Icon && !postionIconRight && (
        <Icon className="w-4 h-4 mr-2 text-white opacity-50 duration-150 ease-in-out transition" />
      )}
      {children}
      {Icon && postionIconRight && (
        <Icon className="w-4 h-4 ml-2 text-white opacity-50 duration-150 ease-in-out transition" />
      )}
    </button>
  );
}
