import { action } from "@storybook/addon-actions";
import { addDays, subDays } from "date-fns";
import React from "react";
import { DatePicker } from ".";

export default {
  component: DatePicker,
  title: "Date Picker"
};

export const datePicker = () => (
  <DatePicker
    label="Date Picker"
    name="date-picker"
    onChange={action("change")}
  />
);

export const datePickerMaxDate = () => {
  const max = addDays(new Date(), 2);
  return <DatePicker label="Date Picker" max={max} name="date-picker" />;
};

export const datePickerMinDate = () => {
  const min = subDays(new Date(), 2);
  return <DatePicker label="Date Picker" min={min} name="date-picker" />;
};
