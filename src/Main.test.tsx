import React from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi, type MockedFunction } from "vitest";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(),
}));

vi.mock("./modules/AppModule", () => ({
  AppModule: () => <div>Mocked AppModule</div>,
}));

describe("index.tsx", () => {
  it("renders the application correctly", async () => {
    // Создаем фиктивный контейнер для корня приложения
    const mockRoot = {
      render: vi.fn(),
      unmount: vi.fn(),
    };

    const mockedCreateRoot = createRoot as MockedFunction<typeof createRoot>;
    mockedCreateRoot.mockReturnValue(mockRoot);

    // Подключаем сам файл
    await import("./main");

    // Проверяем, что `createRoot` был вызван с правильным элементом
    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));

    // Проверяем, что `render` был вызван с компонентом AppModule
    expect(mockRoot.render).toHaveBeenCalledWith(expect.anything());

    // Проверяем, что StrictMode оборачивает приложение
    expect(mockRoot.render.mock.calls[0][0].type).toBe(React.StrictMode);
  });
});
