import React from "react";
import { Accordion } from ".";

export default {
  component: Accordion,
  title: "Accordion"
};

export const accordion = () => {
  return (
    <Accordion isOpen title="Items">
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
    </Accordion>
  );
};
