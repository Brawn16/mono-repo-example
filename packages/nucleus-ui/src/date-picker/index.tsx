import DateFnsUtils from "@date-io/date-fns";
import {
  createMuiTheme,
  MuiThemeProvider,
  TextFieldProps
} from "@material-ui/core";
import {
  DatePicker as MaterialDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { format, parse } from "date-fns";
import React, { useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { FaRegCalendar } from "react-icons/fa";
import { Input } from "../input";
import { DatePickerProps } from "./types";

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        display: "none"
      }
    }
  }
});

export function DatePicker(props: DatePickerProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { max, min } = props;
  let { value } = props;

  // If we have a value, parse into correct
  // date format for browser view
  if (value) {
    const valueDate = parse(value, "yyyy-MM-dd", new Date());
    value = format(valueDate, "dd/MM/yyyy");
  }

  // Build input properties, parsing min
  // and max dates into valid attributes
  const inputProperties = {
    ...props,
    max: max ? format(max, "yyyy-MM-dd") : undefined,
    min: min ? format(min, "yyyy-MM-dd") : undefined
  };

  // Handle datepicker change
  const handleChange = (date: MaterialUiPickersDate) => {
    const { current } = ref;
    if (current === null || date === null) {
      return;
    }

    const event = new Event("input", { bubbles: true });
    current.value = format(date, "dd/MM/yyyy");
    current.dispatchEvent(event);
  };

  return (
    <>
      <MobileView>
        <Input iconType={FaRegCalendar} type="date" {...inputProperties} />
      </MobileView>
      <BrowserView>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MaterialDatePicker
              autoOk
              disableToolbar
              onChange={handleChange}
              openTo="year"
              TextFieldComponent={({ onClick }: TextFieldProps) => (
                <Input
                  componentRef={ref}
                  iconType={FaRegCalendar}
                  onMouseDown={onClick}
                  {...inputProperties}
                />
              )}
              value={null}
            />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </BrowserView>
    </>
  );
}
