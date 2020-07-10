import React from "react";
import { Button } from "./button";
import { ButtonProps } from "./types";

export function PrimaryButton(
  props: React.PropsWithChildren<ButtonProps>
): React.ReactElement {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
}
