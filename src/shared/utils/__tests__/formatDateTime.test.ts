import { formatDateTime } from "@/shared/utils/formatDateTime";
import { describe, expect, it } from "vitest";

describe("formatDateTime", () => {
  it("форматирует ISO-строку с временем по умолчанию", () => {
    expect(formatDateTime("2024-01-15T10:20:30")).toBe("15.01.2024 в 10:20:30");
  });

  it("возвращает только дату, если withTime = false", () => {
    const date = new Date(2024, 0, 15, 10, 20, 30);
    expect(formatDateTime(date, false)).toBe("15.01.2024");
  });

  it("возвращает тире при неверной дате", () => {
    expect(formatDateTime("not-a-date")).toBe("—");
  });

  it("возвращает тире при пустом значении", () => {
    expect(formatDateTime(null)).toBe("—");
  });
});
