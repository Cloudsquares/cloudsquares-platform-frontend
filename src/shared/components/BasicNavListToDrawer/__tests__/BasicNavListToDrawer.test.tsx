import { render, screen, fireEvent } from "@testing-library/react";
import {
  BasicNavListToDrawer,
  BasicNavListToDrawerItem,
} from "../BasicNavListToDrawer";
import { TestProviders } from "../../../../providers";

describe("BasicNavListToDrawer", () => {
  const mockOnClick1 = jest.fn();
  const mockOnClick2 = jest.fn();

  const mockList: BasicNavListToDrawerItem[] = [
    { label: "Пункт 1", onClick: mockOnClick1 },
    { label: "Пункт 2", onClick: mockOnClick2 },
  ];

  const renderComponent = () =>
    render(
      <TestProviders>
        <BasicNavListToDrawer list={mockList} />
      </TestProviders>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит все элементы списка", () => {
    renderComponent();

    expect(screen.getByText("Пункт 1")).toBeInTheDocument();
    expect(screen.getByText("Пункт 2")).toBeInTheDocument();
  });

  it("вызывает правильную функцию onClick при клике на элемент", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Пункт 1" }));
    expect(mockOnClick1).toHaveBeenCalledTimes(1);
    expect(mockOnClick2).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Пункт 2" }));
    expect(mockOnClick2).toHaveBeenCalledTimes(1);
  });

  it("рендерит иконку для каждого элемента", () => {
    renderComponent();

    const icons = screen.getAllByTestId("fa-icon");
    expect(icons).toHaveLength(mockList.length);
  });
});
