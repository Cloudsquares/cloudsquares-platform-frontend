import { TestProviders } from "@/providers";
import { render, screen } from "@testing-library/react";
import React from "react";
import { DiscountLabel } from "../DiscountLabel";

const renderComponent = (props: React.ComponentProps<typeof DiscountLabel>) =>
  render(
    <TestProviders>
      <DiscountLabel {...props} />
    </TestProviders>,
  );

describe("DiscountLabel", () => {
  it("показывает процент скидки и исходную цену", () => {
    renderComponent({ price: 1000, discount: 250 });

    expect(
      screen.getByText((content) => content.includes("-25.00")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("1 000") && content.includes("₽"),
      ),
    ).toBeInTheDocument();
  });

  it("скрывает блок, если скидки нет", () => {
    const { container } = renderComponent({ price: 500, discount: 0 });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("hidden");
  });
});
