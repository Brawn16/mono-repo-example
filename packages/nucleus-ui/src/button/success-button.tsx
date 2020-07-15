import React from "react";
import { FaExclamation } from "react-icons/fa";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function SuccessButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;

  return (
    <Button
      className="text-white bg-green-600 hover:bg-green-500 active:bg-green-800"
      iconType={FaExclamation}
      loadingColor="#fff"
      {...props}
    >
      {children}
    </Button>
  );
}
