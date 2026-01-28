import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AccessDenied } from "../AccessDenied";

describe("Page Access Denied", () => {
  it("renders the Access Denied page", () => {
    render(
      <MemoryRouter>
        <AccessDenied />
      </MemoryRouter>,
    );

    const rootElement = screen.getByTestId("pageAccessDenied");
    expect(rootElement).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(
      <MemoryRouter>
        <AccessDenied />
      </MemoryRouter>,
    );
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /доступ запрещен \(401\)/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("displays error descriptions", () => {
    render(
      <MemoryRouter>
        <AccessDenied />
      </MemoryRouter>,
    );
    expect(screen.getByText(/что случилось\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /вы попали на страницу, для просмотра которой у вас нет прав/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/почему это произошло\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /в большинстве ситуаций ошибка 401 отображается, если вы открыли страницу, к которой у вас нет прав/i,
      ),
    ).toBeInTheDocument();
  });

  it("displays a link to the home page", () => {
    render(
      <MemoryRouter>
        <AccessDenied />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /вернуться на главную/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
