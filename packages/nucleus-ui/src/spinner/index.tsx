import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/interfaces";

export function Spinner(props: LoaderSizeProps) {
  const [spin, setSpin] = useState(false);
  const { color = "gray" } = props;

  useEffect(() => {
    setTimeout(() => setSpin(true), 200);
  }, []);

  if (!spin) {
    return null;
  }

  return <ClipLoader {...props} color={color} />;
}
