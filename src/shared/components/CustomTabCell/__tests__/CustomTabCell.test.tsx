import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CustomTableCell } from "../CustomTabCell";
import { TestProviders } from "../../../../providers";

const renderComponent = (
  props?: Partial<React.ComponentProps<typeof CustomTableCell>>,
) =>
  render(
    <TestProviders>
      <table>
        <tbody>
          <tr>
            <CustomTableCell text="Тестовая ячейка" {...props} />
          </tr>
        </tbody>
      </table>
    </TestProviders>,
  );

describe("CustomTableCell", () => {
  it("отображает текст без кнопки опций, если options не переданы", () => {
    renderComponent();

    expect(screen.getByText("Тестовая ячейка")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("рендерит кнопку опций и открывает меню по клику", () => {
    renderComponent({
      options: [
        { label: "Просмотр", onClick: jest.fn() },
        { label: "Редактировать", onClick: jest.fn() },
      ],
    });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(
      screen.getByRole("menuitem", { name: "Просмотр" }),
    ).toBeInTheDocument();
  });

  it("вызывает обработчик и закрывает меню после выбора опции", async () => {
    const onOptionClick = jest.fn();

    renderComponent({
      options: [{ label: "Удалить", onClick: onOptionClick }],
    });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const option = await screen.findByRole("menuitem", { name: "Удалить" });
    fireEvent.click(option);

    expect(onOptionClick).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});
