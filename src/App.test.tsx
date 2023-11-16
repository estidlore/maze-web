import { render, screen } from "@testing-library/react";
import React from "react";

import { App } from "./App";

describe("App", () => {
  it("Display the header", () => {
    expect.assertions(1);
    render(<App />);
    expect(screen.getByText("maze")).toBeInTheDocument();
  });
});
