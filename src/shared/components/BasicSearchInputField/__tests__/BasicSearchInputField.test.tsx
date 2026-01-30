import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TestProviders } from "../../../../providers";
import { BasicSearchInputField } from "../BasicSearchInputField";

interface PropsWithChildren {
  children: ReactNode;
}

describe("BasicSearchInputField", () => {
  const onChangeMock = vi.fn();

  const Wrapper = ({ children }: PropsWithChildren) => {
    const methods = useForm({ defaultValues: { search: "" } });
    return (
      <TestProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </TestProviders>
    );
  };

  const renderComponent = (
    props: Partial<React.ComponentProps<typeof BasicSearchInputField>> = {},
  ) =>
    render(
      <Wrapper>
        <BasicSearchInputField
          name="search"
          label="Поиск"
          placeholder="Введите запрос"
          onChange={onChangeMock}
          {...props}
        />
      </Wrapper>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("рендерит поле с label и placeholder", () => {
    renderComponent();

    expect(screen.getByLabelText("Поиск")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите запрос")).toBeInTheDocument();
  });

  it("отображает иконку поиска", () => {
    renderComponent();

    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });

  it("вызывает debounced onChange", async () => {
    vi.useFakeTimers();
    renderComponent();

    const input = screen.getByLabelText("Поиск") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test" } });

    await vi.advanceTimersByTimeAsync(350);

    expect(onChangeMock).toHaveBeenCalledWith({ searchQuery: "test" });
  });

  it("очищает значение по клику на крестик", async () => {
    vi.useFakeTimers();
    renderComponent();

    const input = screen.getByLabelText("Поиск") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test" } });
    await vi.advanceTimersByTimeAsync(350);

    const clearButton = screen.getByRole("button", { name: "Очистить поиск" });
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(onChangeMock).toHaveBeenLastCalledWith({ searchQuery: "" });
  });

  it("прокидывает maxLength в input", () => {
    renderComponent({ maxLength: 10 });

    const input = screen.getByLabelText("Поиск") as HTMLInputElement;

    expect(input.maxLength).toBe(10);
  });

  it("показывает сообщение об ошибке, если оно передано", async () => {
    const ErrorWrapper = ({ children }: PropsWithChildren) => {
      const methods = useForm({
        defaultValues: { search: "" },
        mode: "onSubmit",
      });

      // выставим ошибку вручную
      React.useEffect(() => {
        methods.setError("search", { message: "Обязательное поле" });
      }, [methods]);

      return (
        <TestProviders>
          <FormProvider {...methods}>{children}</FormProvider>
        </TestProviders>
      );
    };

    render(
      <ErrorWrapper>
        <BasicSearchInputField
          name="search"
          label="Поиск"
          placeholder="Введите"
          onChange={onChangeMock}
        />
      </ErrorWrapper>,
    );

    expect(await screen.findByText("Обязательное поле")).toBeInTheDocument();
  });
});
