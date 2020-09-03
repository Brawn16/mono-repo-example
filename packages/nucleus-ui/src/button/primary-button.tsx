import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function PrimaryButton(props: PropsWithChildren<ButtonProps>) {
  const { children, className } = props;
  return (
    <Button
      {...props}
      className={`font-semibold text-white rounded bg-sdh-yellow hover:bg-yellow-400 active:bg-yellow-400 ${
        className || ""
      }`}
    >
      {children}
    </Button>
  );
}
