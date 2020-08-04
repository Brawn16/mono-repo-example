import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AccordionProps } from "./types";

export function Accordion(props: AccordionProps) {
  const { children, title, isOpen } = props;
  const [open, setOpen] = useState(isOpen && isOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-lg text-gray-600">{title}</p>
        <button
          className="pt-1 outline-none focus:outline-none"
          onClick={handleClick}
          type="button"
        >
          <BsChevronDown className={`${open ? "transform rotate-180" : ""}`} />
        </button>
      </div>
      <div>{open && children}</div>
    </div>
  );
}
