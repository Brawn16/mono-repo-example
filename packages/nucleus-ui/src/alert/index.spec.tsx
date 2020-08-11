import { render } from "@testing-library/react";
import React from "react";
import { Alert } from ".";

describe("Alert", () => {
  it("allows for custom class", () => {
    const { container } = render(<Alert className="text-pink" />);
    expect(container.innerHTML).toMatch("text-pink");
  });
});
