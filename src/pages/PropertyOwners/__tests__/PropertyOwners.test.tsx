import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TestProviders } from "../../../providers";
import { PropertyOwners } from "../PropertyOwners";

describe("Page PropertyDetails", () => {
  it("renders the PropertyDetails page", () => {
    render(
      <TestProviders>
        <PropertyOwners />
      </TestProviders>,
    );

    const rootElement = screen.getByTestId("pagePropertyOwners");
    expect(rootElement).toBeInTheDocument();
  });
});
