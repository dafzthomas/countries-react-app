import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app heading", () => {
  render(<App />);
  const heading = screen.getByText(/Countries App/i);
  expect(heading).toBeInTheDocument();
});
