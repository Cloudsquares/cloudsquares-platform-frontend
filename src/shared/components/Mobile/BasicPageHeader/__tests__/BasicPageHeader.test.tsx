import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BasicPageHeader } from "../BasicPageHeader";
import { TestProviders } from "../../../../../providers";

// Мокаем useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("BasicPageHeader", () => {
  const renderComponent = (
    props?: Partial<React.ComponentProps<typeof BasicPageHeader>>,
  ) => {
    return render(
      <TestProviders>
        <BasicPageHeader title="Заголовок страницы" {...props} />
      </TestProviders>,
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("отображает заголовок", () => {
    renderComponent();

    expect(screen.getByText("Заголовок страницы")).toBeInTheDocument();
  });

  it("не отображает кнопку назад, если shownBackArrowButton = false", () => {
    renderComponent({ shownBackArrowButton: false });

    const backIcon = screen.queryByRole("button");
    expect(backIcon).not.toBeInTheDocument();
  });

  it("отображает кнопку назад, если shownBackArrowButton = true", () => {
    renderComponent({ shownBackArrowButton: true });

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();
  });

  it("навигация: использует backButtonLink при наличии", () => {
    renderComponent({
      shownBackArrowButton: true,
      backButtonLink: "/custom-back",
    });

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith("/custom-back");
  });

  it("навигация: использует history.back() если window.history.length > 1", () => {
    const spy = vi.spyOn(window.history, "length", "get").mockReturnValue(2);

    renderComponent({ shownBackArrowButton: true });
    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);

    spy.mockRestore();
  });

  it("навигация: fallback на '/' если истории нет", () => {
    const spy = vi.spyOn(window.history, "length", "get").mockReturnValue(1);

    renderComponent({ shownBackArrowButton: true });
    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith("/");

    spy.mockRestore();
  });
});
