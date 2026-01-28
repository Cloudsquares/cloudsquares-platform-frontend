import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { ProfileDetails } from "../ProfileDetails";

describe("Page Profile Details", () => {
  it("renders the Profile Details page", () => {
    render(
      <MemoryRouter>
        <ProfileDetails />
      </MemoryRouter>,
    );

    const rootElement = screen.getByTestId("pageProfileDetails");
    expect(rootElement).toBeInTheDocument();
  });
});
