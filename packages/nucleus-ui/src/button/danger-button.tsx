import React from "react";
import { FaExclamation } from "react-icons/fa";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function DangerButton({
  children,
}: React.PropsWithChildren<ButtonProps>): React.ReactElement {
  return (
    <Button className="bg-red-600" iconType={FaExclamation}>
      {children}
    </Button>
  );
}
