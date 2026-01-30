import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SearchInputForm } from "@/shared/components/SearchInputForm";

const renderComponent = (
  props: Partial<React.ComponentProps<typeof SearchInputForm>> = {},
) => {
  const { sendRequest = vi.fn(), ...rest } = props;

  return {
    sendRequest,
    ...render(
      <SearchInputForm
        sendRequest={sendRequest}
        placeholder="Поиск"
        {...rest}
      />,
    ),
  };
};

describe("SearchInputForm", () => {
  it("вызывает sendRequest после debounce", async () => {
    vi.useFakeTimers();
    const { sendRequest } = renderComponent();

    const input = screen.getByPlaceholderText("Поиск");
    fireEvent.change(input, { target: { value: "test" } });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(sendRequest).toHaveBeenCalledWith({ searchQuery: "test" });
    vi.useRealTimers();
  });

  it("не вызывает sendRequest при превышении maxLength", async () => {
    vi.useFakeTimers();
    const { sendRequest } = renderComponent({ maxLength: 3 });

    const input = screen.getByPlaceholderText("Поиск");
    fireEvent.change(input, { target: { value: "abcd" } });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(sendRequest).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("обновляет значение при смене defaultValue", async () => {
    const { rerender } = renderComponent({ defaultValue: "old" });

    expect(screen.getByPlaceholderText("Поиск")).toHaveValue("old");

    rerender(
      <SearchInputForm
        sendRequest={vi.fn()}
        placeholder="Поиск"
        defaultValue="new"
      />,
    );

    expect(screen.getByPlaceholderText("Поиск")).toHaveValue("new");
  });
});
