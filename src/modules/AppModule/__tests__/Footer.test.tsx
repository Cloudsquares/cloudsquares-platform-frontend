import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "../components/Footer";

describe("Component Footer", () => {
  it("renders the Footer component", () => {
    render(<Footer />);

    const rootElement = screen.getByTestId("footer");
    expect(rootElement).toBeInTheDocument();
  });

  it("renders the Footer component without throwing", () => {
    expect(() => render(<Footer />)).not.toThrow();
  });
});
