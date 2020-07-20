import React from "react";
import { ClipLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/interfaces";

export function Spinner(props: LoaderSizeProps) {
  return <ClipLoader {...props} />;
}
