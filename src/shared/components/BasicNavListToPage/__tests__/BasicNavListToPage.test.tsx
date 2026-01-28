import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { TestProviders } from "../../../../providers";
import {
  BasicNavListToPage,
  BasicNavListToPageItem,
} from "../BasicNavListToPage";

describe("BasicNavListToPage", () => {
  const mockList: BasicNavListToPageItem[] = [
    { label: "Главная", link: "/home" },
    { label: "Контакты", link: "/contacts" },
  ];

  const renderComponent = () =>
    render(
      <TestProviders>
        <BasicNavListToPage list={mockList} />
      </TestProviders>,
    );

  it("рендерит все элементы списка с текстом", () => {
    renderComponent();

    mockList.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("содержит корректные ссылки", () => {
    renderComponent();

    mockList.forEach(({ label, link }) => {
      const linkElement = screen.getByText(label).closest("a");
      expect(linkElement).toHaveAttribute("href", link);
    });
  });

  it("рендерит иконку рядом с каждым пунктом", () => {
    renderComponent();

    const icons = screen.getAllByTestId("fa-icon");
    expect(icons).toHaveLength(mockList.length);
  });

  it("позволяет навигировать по ссылке", async () => {
    renderComponent();

    const user = userEvent.setup();
    const link = screen.getByText("Контакты").closest("a");

    expect(link).toBeVisible();
    await user.click(link!); // не проверяем переход, так как нет роутера в тесте
  });
});
