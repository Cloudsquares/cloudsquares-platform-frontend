import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@/modules/ThemeModule";
import { Header } from "../components/Header";

describe("Component Header", () => {
  it("renders the Header component", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const rootElement = screen.getByTestId("header");
    expect(rootElement).toBeInTheDocument();
  });

  it("renders the Header component without throwing", () => {
    expect(() =>
      render(
        <ThemeProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </ThemeProvider>,
      ),
    ).not.toThrow();
  });
});
