import { render } from "@testing-library/react";
import React from "react";
import { FieldError } from "react-hook-form";
import { Checkbox } from ".";

describe("Checkbox", () => {
  const checkboxError: FieldError = {
    type: "checkbox",
    message: "checkbox error"
  };
  it("shows error state", () => {
    const { container } = render(
      <Checkbox error={checkboxError} label="checkbox" name="checkbox" />
    );
    expect(container.innerHTML).toMatch("checkbox error");
  });
});
