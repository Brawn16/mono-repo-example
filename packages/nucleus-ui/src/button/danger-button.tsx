import React from "react";
import { FaExclamation } from "react-icons/fa";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function DangerButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;

  return (
    <Button
      className="bg-red-600 hover:bg-red-500  active:bg-red-800"
      iconType={FaExclamation}
      {...props}
    >
      {children}
    </Button>
  );
}
