import React from "react";
import ReactSelect, { Props } from "react-select";
import { select } from "./index.module.css";

export function Select(props: Props) {
  return <ReactSelect className={select} {...props} />;
}
