import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import { usePagination } from "../usePagination";

const TestComponent = ({ rowsPerPageKey }: { rowsPerPageKey: string }) => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = usePagination({
    defaultRowsPerPage: 10,
    rowsPerPageKey,
  });
  const location = useLocation();

  return (
    <div>
      <span data-testid="page">{page}</span>
      <span data-testid="rows">{rowsPerPage}</span>
      <span data-testid="search">{location.search}</span>
      <button type="button" onClick={() => setPage(1)}>
        page-2
      </button>
      <button type="button" onClick={() => setRowsPerPage(5)}>
        rows-5
      </button>
    </div>
  );
};

describe("usePagination", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("инициализирует page из URL", () => {
    render(
      <MemoryRouter initialEntries={["/properties?page=2"]}>
        <Routes>
          <Route
            path="/properties"
            element={<TestComponent rowsPerPageKey="paginationTest" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page").textContent).toBe("1");
  });

  it("берёт rowsPerPage из localStorage", () => {
    localStorage.setItem("paginationTest", "25");

    render(
      <MemoryRouter initialEntries={["/properties"]}>
        <Routes>
          <Route
            path="/properties"
            element={<TestComponent rowsPerPageKey="paginationTest" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("rows").textContent).toBe("25");
  });

  it("обновляет страницу в URL", () => {
    render(
      <MemoryRouter initialEntries={["/properties"]}>
        <Routes>
          <Route
            path="/properties"
            element={<TestComponent rowsPerPageKey="paginationTest" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("page-2"));
    expect(screen.getByTestId("search").textContent).toBe("?page=2");
  });

  it("сохраняет rowsPerPage и сбрасывает страницу", () => {
    render(
      <MemoryRouter initialEntries={["/properties?page=2"]}>
        <Routes>
          <Route
            path="/properties"
            element={<TestComponent rowsPerPageKey="paginationTest" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("rows-5"));

    expect(localStorage.getItem("paginationTest")).toBe("5");
    expect(screen.getByTestId("page").textContent).toBe("0");
    expect(screen.getByTestId("search").textContent).toBe("?page=1");
  });
});
