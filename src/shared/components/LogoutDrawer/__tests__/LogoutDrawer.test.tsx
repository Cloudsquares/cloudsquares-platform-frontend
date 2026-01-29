import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { LogoutDrawer } from "../LogoutDrawer";

describe("LogoutDrawer", () => {
  it("рендерит заголовок и кнопки", () => {
    const setIsOpen = vi.fn();

    render(
      <MemoryRouter>
        <LogoutDrawer isOpen setIsOpen={setIsOpen} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Выйти из аккаунта?" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Отмена" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Да, выйти" }),
    ).toBeInTheDocument();
  });
});
