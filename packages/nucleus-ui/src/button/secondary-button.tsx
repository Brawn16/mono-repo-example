import React from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function SecondaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children, className } = props;
  return (
    <Button
      className={`font-semibold text-gray-500 rounded bg-gray-200 hover:bg-gray-300 active:bg-gray-400 ${
        className || ""
      }`}
      loadingColor="#fff"
      {...props}
    >
      {children}
    </Button>
  );
}
