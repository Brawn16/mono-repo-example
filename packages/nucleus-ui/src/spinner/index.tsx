import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/interfaces";

export function Spinner(props: LoaderSizeProps) {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setTimeout(() => setSpin(true), 500);
  }, []);

  if (!spin) {
    return null;
  }

  return <ClipLoader {...props} />;
}
