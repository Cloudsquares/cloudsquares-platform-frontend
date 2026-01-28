import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { PageNotFound } from "../PageNotFound";

describe("PageNotFound", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );

    const rootElement = screen.getByTestId("pagePageNotFound");
    expect(rootElement).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /страница не найдена \(404\)/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("displays error descriptions", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );

    // Проверяем текстовые описания
    expect(screen.getByText(/что случилось\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/вы попали на страницу, которой не существует/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/почему это произошло\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /в большинстве ситуаций ошибка 404 отображается, если связь с сервером установлена, но информации по заданному запросу нет\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/что делать\?/i)).toBeInTheDocument();
  });

  it("displays a link to the home page", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /главную страницу/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
