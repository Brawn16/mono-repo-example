import React from "react";

import { Button } from "./button";
import { ButtonProps } from "./types";

export function SecondaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;
  return (
    <Button
      className="text-blue-600 bg-transparent border border-blue-400 hover:text-white hover:bg-blue-500 text-white-600 active:bg-blue-800 ${}"
      {...props}
    >
      {children}
    </Button>
  );
}
