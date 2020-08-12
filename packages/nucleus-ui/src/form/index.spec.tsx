import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { Form } from "./index.stories";

describe("Form", () => {
  it("submits with correct values and only once", async () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Form onSubmit={(data: object) => mockSubmit(data)} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText("Firstname"), {
        target: { value: "john" }
      });

      fireEvent.change(getByLabelText("Lastname"), {
        target: { value: "smith" }
      });

      fireEvent.click(getByRole("button"));
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      firstName: "john",
      lastName: "smith"
    });
  });

  it("handles firstname validation error", async () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, container, getByRole } = render(
      <Form onSubmit={mockSubmit} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText("Firstname"), {
        target: { value: "" }
      });
      fireEvent.change(getByLabelText("Lastname"), {
        target: { value: "smith" }
      });

      fireEvent.click(getByRole("button"));
    });

    expect(container.innerHTML).toMatch("Firstname is required");
  });

  it("handles lastname validation error", async () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, container, getByRole } = render(
      <Form onSubmit={mockSubmit} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText("Firstname"), {
        target: { value: "john" }
      });

      fireEvent.change(getByLabelText("Lastname"), {
        target: { value: "" }
      });

      fireEvent.click(getByRole("button"));
    });

    expect(container.innerHTML).toMatch("Lastname is required");
  });
});
