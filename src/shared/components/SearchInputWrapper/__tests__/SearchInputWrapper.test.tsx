import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "@/modules/ThemeModule";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
};

interface RenderOptions {
  initialEntries?: string[];
}

const renderComponent = (
  props: React.ComponentProps<typeof SearchInputWrapper> = {},
  { initialEntries = ["/"] }: RenderOptions = {},
) =>
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <SearchInputWrapper {...props} />
        <LocationDisplay />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("SearchInputWrapper", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("синхронизирует запрос с URL и сбрасывает страницу", async () => {
    renderComponent(
      { placeholder: "Поиск", pageParamToReset: "page" },
      { initialEntries: ["/properties?page=3&q=old"] },
    );

    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toHaveValue("old");

    fireEvent.change(input, { target: { value: "new" } });
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    const params = new URLSearchParams(
      screen.getByTestId("location").textContent ?? "",
    );

    expect(params.get("q")).toBe("new");
    expect(params.get("page")).toBe("1");
  });

  it("работает в контролируемом режиме без изменения URL", async () => {
    const onQueryChange = vi.fn();

    renderComponent({
      placeholder: "Поиск",
      query: "boss",
      onQueryChange,
    });

    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toHaveValue("boss");

    fireEvent.change(input, { target: { value: "boss new" } });
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(onQueryChange).toHaveBeenCalledWith("boss new");
    expect(screen.getByTestId("location").textContent).toBe("");
  });
});
