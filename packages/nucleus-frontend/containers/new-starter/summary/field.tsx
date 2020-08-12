import React from "react";
import { FieldProps } from "./types";

export const Field = (props: FieldProps) => {
  const { label, value } = props;
  return (
    <div className="flex justify-between">
      <p className="font-bold">{`${label}:`}</p>
      <p>{value}</p>
    </div>
  );
};
