import React from "react";
import { Spinner } from "../spinner";
import { ButtonProps } from "./types";

function renderLoading(loadingColor?: string) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner color={loadingColor} size={16} />
    </div>
  );
}

export function Button(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const {
    children,
    iconType: Icon,
    postionIconRight,
    disabled,
    loading,
    loadingColor,
  } = props;
  let innerClassName = "truncate relative flex items-center justify-center";
  let {
    className = "text-gray-800 border border-gray-300 hover:border-gray-400 active:border-gray-400",
  } = props;

  className +=
    " relative px-6 py-2 focus:outline-none duration-150 ease-in-out transition";

  if (disabled) {
    className += " opacity-50 cursor-not-allowed";
  }

  if (loading) {
    className += " cursor-not-allowed";
    innerClassName += " opacity-0";
  }

  // Build props to pass to button
  const buttonProperties = { ...props };
  delete buttonProperties.iconType;
  delete buttonProperties.postionIconRight;
  delete buttonProperties.loading;
  delete buttonProperties.loadingColor;

  return (
    <button type="submit" {...buttonProperties} className={className}>
      <span className={innerClassName}>
        {Icon && !postionIconRight && (
          <Icon className="w-3 h-3 mr-1 text-white opacity-50 duration-150 ease-in-out transition" />
        )}
        {children}
        {Icon && postionIconRight && (
          <Icon className="w-3 h-3 ml-1 text-white opacity-50 duration-150 ease-in-out transition" />
        )}
      </span>
      {loading && renderLoading(loadingColor)}
    </button>
  );
}
