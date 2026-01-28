import {
  calculatePricePerMeter,
  formatPrice,
} from "@/shared/utils/calculatePricePerMeter";
import { describe, expect, it } from "vitest";

describe("formatPrice", () => {
  it("форматирует сумму без дробной части по умолчанию", () => {
    expect(formatPrice(1000)).toBe("1\u00A0000");
    expect(formatPrice(9876543)).toBe("9\u00A0876\u00A0543");
  });

  it("учитывает переданные опции форматирования", () => {
    expect(formatPrice(1234.56, { maximumFractionDigits: 2 })).toBe(
      "1\u00A0234,56",
    );
  });
});

describe("calculatePricePerMeter", () => {
  it("делит цену на квадратуру и форматирует результат", () => {
    expect(calculatePricePerMeter(1000000, 50)).toBe("20\u00A0000");
  });
});
