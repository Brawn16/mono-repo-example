import { render, act, fireEvent } from "@testing-library/react";
import React from "react";
import { Input } from ".";

describe("Input", () => {
  it("handle change is called", async () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <Input label="Firstname" name="FirstName" onChange={mockOnChange} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText("Firstname"), {
        target: { value: "john" },
      });
    });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
