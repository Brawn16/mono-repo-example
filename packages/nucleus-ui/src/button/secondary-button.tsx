import React from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function SecondaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;
  return (
    <Button
      className="text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-800"
      loadingColor="#fff"
      {...props}
    >
      {children}
    </Button>
  );
}
