import { UserSlim } from "@/shared/interfaces";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AgentCompactCard } from "../AgentCompactCard";

const baseAgent: UserSlim = {
  id: "1",
  phone: "+70000000000",
  first_name: "Ivan",
  last_name: "Petrov",
  middle_name: null,
};

describe("AgentCompactCard", () => {
  const renderComponent = (override?: Partial<UserSlim>) =>
    render(<AgentCompactCard agent={{ ...baseAgent, ...override }} />);

  it("отображает инициалы и полное имя агента", () => {
    renderComponent();

    expect(screen.getByText("Petrov Ivan")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("показывает должность и рейтинг", () => {
    const { container } = renderComponent();

    expect(screen.getByText("Специалист по недвижимости")).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/)).toHaveTextContent("Рейтинг 5.0");

    const starIcon = container.querySelector("svg");
    expect(starIcon).toBeInTheDocument();
  });
});
