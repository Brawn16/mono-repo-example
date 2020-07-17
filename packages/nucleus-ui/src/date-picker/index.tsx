import { format } from "date-fns";
import React, { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import { BrowserView, MobileView } from "react-device-detect";
import { FaCalendar } from "react-icons/fa";
import { Input } from "../input";
import { DatePickerProps } from "./types";
import "./index.css";

export function DatePicker(props: DatePickerProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { componentRef, max, min } = props;

  // Build input properties, parsing min and max dates
  // into valid attributes
  const inputProperties = {
    ...props,
    max: max ? format(max, "yyyy-MM-dd") : undefined,
    min: min ? format(min, "yyyy-MM-dd") : undefined
  };

  const handleChange = (date: Date | null) => {
    console.log(date, ref);
  };

  return (
    <>
      <MobileView>
        <Input iconType={FaCalendar} type="date" {...inputProperties} />
      </MobileView>
      <BrowserView>
        <Input componentRef={ref} iconType={FaCalendar} {...inputProperties} />
        <ReactDatePicker
          customInput={<></>}
          dateFormat="dd/MM/yyyy"
          onChange={handleChange}
          open
        />
      </BrowserView>
    </>
  );
}
