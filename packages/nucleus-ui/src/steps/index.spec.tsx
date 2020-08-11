/* eslint-disable no-script-url */
import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { Steps } from ".";

describe("Steps", () => {
  const standard = [
    { label: "Dashboard", path: "javascript:void(0)" },
    { label: "Customers", path: "javascript:void(0)" },
    { label: "Mr Smith", path: "javascript:void(0)" },
  ];

  const singleStep = [{ label: "Dashboard", path: "javascript:void(0)" }];

  it("renders correct steps", () => {
    const { container } = render(<Steps steps={standard} />);
    expect(container.innerHTML).toMatch("Dashboard");
    expect(container.innerHTML).toMatch("Customers");
    expect(container.innerHTML).toMatch("Mr Smith");
  });

  it("onClick is called correctly when is passed", async () => {
    const mockClick = jest.fn();

    const { getByTestId } = render(
      <Steps onClick={mockClick} steps={singleStep} />
    );

    await act(async () => {
      fireEvent.click(getByTestId("step-link"));
    });

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("method is not called when not passed in", async () => {
    const mockClick = jest.fn();

    const { getByTestId } = render(<Steps steps={singleStep} />);

    await act(async () => {
      fireEvent.click(getByTestId("step-link"));
    });

    expect(mockClick).toHaveBeenCalledTimes(0);
  });
});
