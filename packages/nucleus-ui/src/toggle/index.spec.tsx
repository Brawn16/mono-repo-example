import { render } from "@testing-library/react";
import React from "react";
import { FieldError } from "react-hook-form";
import { Toggle } from ".";

describe("Toggle", () => {
  const toggleError: FieldError = {
    type: "toggle",
    message: "toggle error"
  };
  it("shows error state", () => {
    const { container } = render(
      <Toggle error={toggleError} label="toggle" name="toggle" />
    );
    expect(container.innerHTML).toMatch("toggle error");
  });
});
