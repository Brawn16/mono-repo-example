import React from "react";
import { DatePicker } from ".";

export default {
  component: DatePicker,
  title: "Date Picker",
};

export const datePicker = () => (
  <DatePicker label="Date Picker" name="date-picker" />
);
