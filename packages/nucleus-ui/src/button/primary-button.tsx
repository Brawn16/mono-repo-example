import React from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function PrimaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children, className } = props;
  return (
    <Button
      {...props}
      className={`font-semibold text-white bg-yellow-300 rounded hover:bg-yellow-400 active:bg-yellow-400 ${
        className || ""
      }`}
      loadingColor="#fff"
    >
      {children}
    </Button>
  );
}
