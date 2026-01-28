import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { BasicTextField } from "../BasicTextField";
import { TestProviders } from "../../../../providers";

interface FormFields extends Record<string, unknown> {
  email: string;
}

describe("BasicTextField", () => {
  const label = "Email";
  const placeholder = "Введите email";

  const onClickMock = vi.fn();

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm<FormFields>({
      defaultValues: { email: "" },
      mode: "onSubmit",
    });
    return (
      <TestProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </TestProviders>
    );
  };

  const renderComponent = (
    props?: Partial<React.ComponentProps<typeof BasicTextField<FormFields>>>,
  ) =>
    render(
      <Wrapper>
        <BasicTextField<FormFields>
          name="email"
          label={label}
          placeholder={placeholder}
          {...props}
        />
      </Wrapper>,
    );

  it("рендерит поле с label и placeholder", () => {
    renderComponent();

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("отображает кастомный helperText", () => {
    renderComponent({ helperText: "Обязательное поле" });

    expect(screen.getByText("Обязательное поле")).toBeInTheDocument();
  });

  it("отображает сообщение об ошибке, если оно есть", () => {
    const ErrorWrapper: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => {
      const methods = useForm<FormFields>({
        defaultValues: { email: "" },
        mode: "onSubmit",
      });

      React.useEffect(() => {
        methods.setError("email", { message: "Некорректный email" });
      }, [methods]);

      return (
        <TestProviders>
          <FormProvider {...methods}>{children}</FormProvider>
        </TestProviders>
      );
    };

    render(
      <ErrorWrapper>
        <BasicTextField<FormFields>
          name="email"
          label={label}
          placeholder={placeholder}
        />
      </ErrorWrapper>,
    );

    expect(screen.getByText("Некорректный email")).toBeInTheDocument();
  });

  it("вызывает onClick, если передан", () => {
    renderComponent({ onClick: onClickMock });

    const input = screen.getByLabelText(label);
    fireEvent.click(input);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("принимает значение через ввод", () => {
    renderComponent();

    const input = screen.getByLabelText(label) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input.value).toBe("test@example.com");
  });
});
