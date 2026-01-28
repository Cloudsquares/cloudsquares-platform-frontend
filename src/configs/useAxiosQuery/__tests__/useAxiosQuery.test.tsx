import axios from "axios";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { useAxiosQuery } from "../useAxiosQuery";

// Настройка mock для axios
const mock = new MockAdapter(axios);

// Создаём тестовый компонент для использования хука
const TestComponent = ({ url }: { url: string }) => {
  const { data, error, isLoading } = useAxiosQuery({
    queryKey: ["testData", url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};

// Конфигурируем QueryClient для тестов
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Чтобы избежать повторных запросов в тестах
    },
  },
});

// Оборачиваем компонент в QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("useAxiosQuery", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches and displays data successfully", async () => {
    const mockData = { message: "Hello, world!" };
    mock.onGet("/test-url").reply(200, mockData);

    renderWithQueryClient(<TestComponent url="/test-url" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Hello, world!/)).toBeInTheDocument(),
    );
  });

  it("displays an error message on failure", async () => {
    mock.onGet("/test-url").reply(500);

    renderWithQueryClient(<TestComponent url="/test-url" />);

    await waitFor(() => expect(screen.getByText(/Error/)).toBeInTheDocument());
  });
});
