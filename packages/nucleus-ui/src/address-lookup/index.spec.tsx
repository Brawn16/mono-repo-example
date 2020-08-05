import { render, act, fireEvent } from "@testing-library/react";
import React from "react";
import { AddressLookup } from ".";

describe("AddressLookup", () => {
  it("handles address selection", async () => {
    const mockOnSelection = jest.fn();
    const { getByRole, getByLabelText } = render(
      <AddressLookup label="Address Lookup" onAddressSelect={mockOnSelection} />
    );
    await act(async () => {
      fireEvent.change(getByLabelText("Address Lookup"), { value: "m9 7jb" });
    });
    await act(async () => {
      fireEvent.click(getByRole("button"));
    });
  });
});
