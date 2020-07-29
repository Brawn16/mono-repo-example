import { render } from "@testing-library/react";
import React from "react";
import { FieldError } from "react-hook-form";
import { Select } from ".";

describe("Select", () => {
  const selectError: FieldError = {
    type: "select",
    message: "select error"
  };
  const options = [
    { label: "Great Britain", value: "Great Britain" },
    { label: "France", value: "France" },
    { label: "Spain", value: "Spain" },
    { label: "Germany", value: "Germany" }
  ];
  it("shows error state", () => {
    const { container } = render(
      <Select error={selectError} name="select" options={options} />
    );
    expect(container.innerHTML).toMatch("select error");
  });

  it("allows custom placeholder", () => {
    const { container } = render(
      <Select
        name="select"
        options={options}
        placeholder="custom placeholder"
      />
    );
    expect(container.innerHTML).toMatch("custom placeholder");
  });
});
