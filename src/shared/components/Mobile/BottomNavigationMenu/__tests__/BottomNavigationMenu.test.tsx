import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { BottomNavigationMenu } from "../BottomNavigationMenu";
import { shouldShowBottomNav } from "../utils";

/**
 * Хелпер для рендера компонента с заданным маршрутом.
 */
const renderWithRoute = (initialPath = "/") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <BottomNavigationMenu />
    </MemoryRouter>,
  );

describe("BottomNavigationMenu", () => {
  it("отображает все пункты меню на /", () => {
    renderWithRoute("/");

    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("Каталог")).toBeInTheDocument();
    expect(screen.getByText("Заявки")).toBeInTheDocument();
    expect(screen.getByText("Профиль")).toBeInTheDocument();
  });

  it("подсвечивает Главная как активную при /", () => {
    renderWithRoute("/");
    const home = screen.getByTestId("nav-item-home");
    expect(home).toHaveAttribute("aria-current", "page");
  });

  it("подсвечивает Каталог как активную при /properties", () => {
    renderWithRoute("/properties");
    const catalog = screen.getByTestId("nav-item-properties");
    expect(catalog).toHaveAttribute("aria-current", "page");
  });

  it("подсвечивает Заявки как активную при /cart", () => {
    renderWithRoute("/cart");
    const cart = screen.getByTestId("nav-item-cart");
    expect(cart).toHaveAttribute("aria-current", "page");
  });

  it("подсвечивает Профиль как активную при /profile", () => {
    renderWithRoute("/profile");
    const profile = screen.getByTestId("nav-item-profile");
    expect(profile).toHaveAttribute("aria-current", "page");
  });

  it("не рендерится на /properties/create", () => {
    renderWithRoute("/properties/create");
    // Любой из элементов меню отсутствует
    expect(screen.queryByTestId("nav-item-home")).not.toBeInTheDocument();
    expect(screen.queryByText("Каталог")).not.toBeInTheDocument();
  });

  it("не рендерится на /properties/:id/update (динамический сегмент)", () => {
    renderWithRoute("/properties/123/update");
    expect(screen.queryByTestId("nav-item-home")).not.toBeInTheDocument();
    expect(screen.queryByText("Профиль")).not.toBeInTheDocument();
  });

  it("рендерится на деталях объекта /properties/:id", () => {
    renderWithRoute("/properties/42");
    // Меню видно, пункты присутствуют
    expect(screen.getByText("Каталог")).toBeInTheDocument();
  });

  it("Главная не активна на внутренних маршрутах (из-за end)", () => {
    renderWithRoute("/properties");
    const home = screen.getByTestId("nav-item-home");
    expect(home).not.toHaveAttribute("aria-current", "page");
  });
});

describe("shouldShowBottomNav (unit)", () => {
  it("скрывает на create и update", () => {
    expect(shouldShowBottomNav("/properties/create")).toBe(false);
    expect(shouldShowBottomNav("/properties/789/update")).toBe(false);
  });

  it("показывает на остальных (пример: детали)", () => {
    expect(shouldShowBottomNav("/properties/789")).toBe(true);
  });
});
