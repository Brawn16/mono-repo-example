import { CircularProgress, CircularProgressProps } from "@material-ui/core";
import * as React from "react";
import { spinner } from "./index.module.css";

export function Spinner(props: CircularProgressProps) {
  return (
    <CircularProgress className={spinner} size={64} thickness={4} {...props} />
  );
}
