import { calculateDiscountInPercent } from "@/shared/utils/calculateDiscountInPercent";
import { describe, expect, it } from "vitest";

describe("calculateDiscountInPercent", () => {
  it("возвращает скидку в процентах с двумя знаками после запятой", () => {
    expect(calculateDiscountInPercent(1000, 250)).toBe("25.00");
    expect(calculateDiscountInPercent(3999, 999)).toBe("24.98");
  });
});
