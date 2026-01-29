import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Pagination } from "../Pagination";

describe("Pagination", () => {
  it("рендерит кнопки страниц и стрелки", () => {
    render(
      <Pagination
        page={0}
        rowsPerPage={5}
        total={6}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={() => null}
        onRowsPerPageChange={() => null}
      />,
    );

    expect(screen.getByText("На странице")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Предыдущая страница" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Следующая страница" }),
    ).toBeInTheDocument();
  });

  it("рендерит многоточие при большом числе страниц", () => {
    render(
      <Pagination
        page={0}
        rowsPerPage={5}
        total={100}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={() => null}
        onRowsPerPageChange={() => null}
      />,
    );

    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });

  it("не рендерит пагинацию при total=0", () => {
    render(
      <Pagination
        page={0}
        rowsPerPage={10}
        total={0}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={() => null}
        onRowsPerPageChange={() => null}
      />,
    );

    expect(screen.queryByText("На странице")).not.toBeInTheDocument();
  });
});
