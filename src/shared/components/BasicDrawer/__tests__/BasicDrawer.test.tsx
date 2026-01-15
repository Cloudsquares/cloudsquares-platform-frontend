import { render, screen, fireEvent } from "@testing-library/react";
import { BasicDrawer } from "../BasicDrawer";

describe("BasicDrawer", () => {
  const defaultProps = {
    title: "Тестовый заголовок",
    isOpen: true,
    setIsOpen: jest.fn(),
    children: <div data-testid="drawer-children">Контент модального окна</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("отображает заголовок и содержимое", () => {
    render(<BasicDrawer {...defaultProps} />);

    expect(screen.getByText("Тестовый заголовок")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-children")).toBeInTheDocument();
  });

  it("отображает кнопку закрытия", () => {
    render(<BasicDrawer {...defaultProps} />);

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("вызывает setIsOpen(false) при клике по кнопке закрытия", () => {
    render(<BasicDrawer {...defaultProps} />);

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(defaultProps.setIsOpen).toHaveBeenCalledTimes(1);
    expect(defaultProps.setIsOpen).toHaveBeenCalledWith(false);
  });

  it("вызывает setIsOpen(false) при нажатии Escape", () => {
    render(<BasicDrawer {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.setIsOpen).toHaveBeenCalledWith(false);
  });
});
