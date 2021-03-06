import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function DangerButton(props: PropsWithChildren<ButtonProps>) {
  const { children } = props;
  return (
    <Button
      className="text-white bg-red-600 rounded hover:bg-red-700 active:bg-red-700"
      {...props}
    >
      {children}
    </Button>
  );
}
