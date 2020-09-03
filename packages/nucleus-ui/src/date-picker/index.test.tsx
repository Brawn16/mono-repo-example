import { render } from "@testing-library/react";
import React from "react";
import { DatePicker } from ".";

describe("DatePicker", () => {
  it("handles value prop", () => {
    const { container } = render(
      <DatePicker
        label="date-picker"
        name="date-picker"
        onChange={() => {}}
        value="2008-07-23"
      />
    );
    expect(container.innerHTML).toMatch("2008-07-23");
  });
});
