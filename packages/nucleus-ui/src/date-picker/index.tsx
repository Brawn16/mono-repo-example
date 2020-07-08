import React from "react";
import { Input } from "../input";
import { InputProps } from "../input/types";

export function DatePicker(props: InputProps) {
  return <Input {...props} type="date" />;
}
