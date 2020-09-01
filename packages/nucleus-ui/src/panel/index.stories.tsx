import React from "react";
import { Input } from "../input";
import { Panel } from ".";

export default {
  component: Panel,
  title: "Panel",
};

export function panel() {
  return (
    <Panel>
      <Input label="Input" name="input" />
    </Panel>
  );
}

export function customClass() {
  return (
    <Panel className="bg-blue-50">
      <Input label="Input" name="input" />
    </Panel>
  );
}
