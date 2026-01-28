import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Login } from "../Login";
import { TestProviders } from "../../../providers";

describe("Page Login", () => {
  it("renders the Login page", () => {
    render(
      <TestProviders>
        <Login />
      </TestProviders>,
    );

    const rootElement = screen.getByTestId("pageLogin");
    expect(rootElement).toBeInTheDocument();
  });
});
