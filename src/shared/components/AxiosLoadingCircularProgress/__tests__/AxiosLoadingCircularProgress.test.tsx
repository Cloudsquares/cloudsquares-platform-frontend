import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AxiosLoadingCircularProgress } from "..";

describe("AxiosLoadingCircularProgress", () => {
  it("рендерит компонент с индикатором загрузки", () => {
    render(<AxiosLoadingCircularProgress />);

    const rootElement = screen.getByTestId(
      "componentAxiosLoadingCircularProgress",
    );
    expect(rootElement).toBeInTheDocument();
  });
});
