import React from "react";
import { FieldsProps } from "./types";

export const Fields = (props: FieldsProps) => {
  const { label, values } = props;
  return (
    <div className="flex justify-between">
      <p className="font-bold">{`${label}:`}</p>
      <div>
        {values.map((value) => {
          return <p key={value}>{value}</p>;
        })}
      </div>
    </div>
  );
};
