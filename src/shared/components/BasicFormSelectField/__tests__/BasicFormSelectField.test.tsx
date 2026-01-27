import { TestProviders } from "@/providers";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BasicFormSelectField } from "../BasicFormSelectField";

type FormValues = {
  status: string;
};

const data = [
  { value: "active", label: "Активен" },
  { value: "inactive", label: "Неактивен" },
];

const defaultProps = {
  name: "status" as const,
  label: "Статус",
  placeholder: "Выберите статус",
  data,
};

const renderComponent = (
  props: Partial<
    React.ComponentProps<typeof BasicFormSelectField<FormValues>>
  > = {},
  options?: { withError?: boolean },
) => {
  const Wrapper: React.FC<{
    children: React.ReactNode;
    withError?: boolean;
  }> = ({ children, withError }) => {
    const methods = useForm<FormValues>({ defaultValues: { status: "" } });

    React.useEffect(() => {
      if (withError) {
        methods.setError("status", {
          type: "manual",
          message: "Поле обязательно",
        });
      }
    }, [methods, withError]);

    return (
      <TestProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </TestProviders>
    );
  };

  return render(
    <Wrapper withError={options?.withError}>
      <BasicFormSelectField<FormValues> {...defaultProps} {...props} />
    </Wrapper>,
  );
};

describe("BasicFormSelectField", () => {
  it("рендерит label и плейсхолдер", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent(
      defaultProps.placeholder,
    );
  });

  it("открывает список и позволяет выбрать значение", async () => {
    const user = userEvent.setup();
    renderComponent();

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const option = await screen.findByRole("option", { name: "Активен" });
    await user.click(option);

    expect(screen.getByRole("combobox")).toHaveTextContent("Активен");
  });

  it("отображает кнопку в меню и вызывает обработчик", async () => {
    const user = userEvent.setup();
    const onButtonClick = jest.fn();

    renderComponent({
      buttonOptions: {
        buttonLabel: "Добавить опцию",
        onButtonClick,
      },
    });

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    const addButton = within(listbox).getByRole("button", {
      name: "Добавить опцию",
    });

    await user.click(addButton);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it("показывает сообщение об ошибке", () => {
    renderComponent({}, { withError: true });

    expect(screen.getByText("Поле обязательно")).toBeInTheDocument();
  });
});
