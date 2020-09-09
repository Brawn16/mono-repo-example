import React, { PropsWithChildren } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function SuccessButton(props: PropsWithChildren<ButtonProps>) {
  const { children } = props;

  return (
    <Button
      className="text-white bg-green-600 rounded hover:bg-green-500 active:bg-green-800"
      iconType={AiOutlineCheck}
      {...props}
    >
      {children}
    </Button>
  );
}
