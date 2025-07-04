import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./index";

describe("Loader Component", () => {
  test("renders loader component", () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
  test("renders three span elements", () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId("loader");
    const spanElements = loaderElement.querySelectorAll(".element");
    expect(spanElements).toHaveLength(3);
  });
});
