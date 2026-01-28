import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DisplayCountryFlag } from "../DisplayCountryFlag";
import { CountryCode, CountryCodeDisplayFlag } from "../../../interfaces";

describe("DisplayCountryFlag", () => {
  const renderComponent = (country_code: CountryCode) =>
    render(<DisplayCountryFlag country_code={country_code} />);

  it("корректно отображает флаг для всех значений CountryCode", () => {
    Object.values(CountryCode).forEach((code) => {
      renderComponent(code);
      expect(
        screen.getByText(CountryCodeDisplayFlag[code]),
      ).toBeInTheDocument();
    });
  });

  it("рендерит элемент <span>", () => {
    renderComponent(CountryCode.KZ);
    const element = screen.getByText(CountryCodeDisplayFlag.KZ);
    expect(element.tagName.toLowerCase()).toBe("span");
  });
});
