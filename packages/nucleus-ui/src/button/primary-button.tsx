import React from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function PrimaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;
  return (
    <Button
      className="text-white bg-blue-600 hover:bg-blue-700 active:bg-red-700"
      loadingColor="#fff"
      {...props}
    >
      {children}
    </Button>
  );
}
