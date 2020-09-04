import React, { PropsWithChildren } from "react";
import { ButtonProps } from "./types";

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, iconType: Icon, postionIconRight, disabled } = props;
  let {
    className = "text-gray-800 border border-gray-300 rounded hover:border-gray-400 active:border-gray-400",
  } = props;

  className +=
    " relative px-8 py-3 font-montserrat focus:outline-none duration-150 ease-in-out transition";

  if (disabled) {
    className += " opacity-50 cursor-not-allowed";
  }

  // Build props to pass to button
  const buttonProperties = { ...props };
  delete buttonProperties.iconType;
  delete buttonProperties.postionIconRight;

  return (
    <button type="button" {...buttonProperties} className={className}>
      <span className="relative flex items-center justify-center truncate">
        {Icon && !postionIconRight && (
          <Icon className="w-3 h-3 mr-1 text-white opacity-50 duration-150 ease-in-out transition" />
        )}
        {children}
        {Icon && postionIconRight && (
          <Icon className="w-3 h-3 ml-1 text-white opacity-50 duration-150 ease-in-out transition" />
        )}
      </span>
    </button>
  );
}
