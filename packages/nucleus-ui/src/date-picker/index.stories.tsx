import { action } from "@storybook/addon-actions";
import { parse } from "date-fns";
import React from "react";
import { DatePicker } from ".";

export default {
  component: DatePicker,
  title: "Date Picker",
};

export const datePicker = () => (
  <DatePicker
    label="Date Picker"
    name="date-picker"
    onChange={action("onChange")}
  />
);

export const maxDate = () => {
  const max = parse("2099-01-01", "yyyy-MM-dd", new Date());
  return (
    <DatePicker
      label="Date Picker"
      max={max}
      name="date-picker"
      onChange={action("onChange")}
    />
  );
};

export const minDate = () => {
  const min = parse("2000-01-01", "yyyy-MM-dd", new Date());
  return (
    <DatePicker
      label="Date Picker"
      min={min}
      name="date-picker"
      onChange={action("onChange")}
    />
  );
};
