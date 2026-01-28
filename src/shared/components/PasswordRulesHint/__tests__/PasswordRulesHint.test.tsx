import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordRulesHint } from "../PasswordRulesHint";

describe("PasswordRulesHint", () => {
  it("не рендерится, если поле не тронули", () => {
    const { container } = render(
      <PasswordRulesHint password="" touched={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("показывает список правил, когда пароль не соответствует требованиям", () => {
    render(<PasswordRulesHint password="short" touched />);

    [
      "Минимум 12 символов",
      "Хотя бы одна заглавная буква (A-Z)",
      "Хотя бы одна строчная буква (a-z)",
      "Хотя бы одна цифра (0-9)",
      "Хотя бы один спецсимвол (!*@#$%^&+=_-)",
    ].forEach((rule) => {
      expect(screen.getByText(rule)).toBeInTheDocument();
    });
  });

  it("не рендерится, если все правила пройдены", () => {
    const strongPassword = "ValidPassword123!";
    const { container } = render(
      <PasswordRulesHint password={strongPassword} touched />,
    );

    expect(container.firstChild).toBeNull();
  });
});
