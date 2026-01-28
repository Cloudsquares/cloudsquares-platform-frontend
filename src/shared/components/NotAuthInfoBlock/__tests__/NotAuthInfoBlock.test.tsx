import { TestProviders } from "@/providers";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NotAuthInfoBlock } from "../NotAuthInfoBlock";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderComponent = () =>
  render(
    <TestProviders>
      <NotAuthInfoBlock />
    </TestProviders>,
  );

describe("NotAuthInfoBlock", () => {
  it("отображает тексты и ссылку на логин", () => {
    renderComponent();

    expect(screen.getByText("Упс, Вы не авторизованы ;(")).toBeInTheDocument();
    expect(
      screen.getByText("Управляйте объектами недвижимости и заявками!"),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "login" });
    expect(link).toHaveAttribute("href", "/login");
  });
});
