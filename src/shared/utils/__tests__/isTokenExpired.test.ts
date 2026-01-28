import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import { decodeToken } from "@/shared/utils/decodeToken";
import { isTokenExpired } from "@/shared/utils/isTokenExpired";

vi.mock("@/shared/utils/decodeToken", () => ({
  decodeToken: vi.fn(),
}));

describe("isTokenExpired", () => {
  const nowSpy = vi.spyOn(Date, "now");

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    nowSpy.mockRestore();
  });

  it("возвращает true, если токен отсутствует", () => {
    expect(isTokenExpired(null)).toBe(true);
  });

  it("возвращает true, если токен не удалось декодировать", () => {
    vi.mocked(decodeToken).mockReturnValueOnce(null);
    expect(isTokenExpired("broken")).toBe(true);
  });

  it("возвращает false, если токен ещё не истёк", () => {
    const now = 1_700_000_000_000;
    nowSpy.mockReturnValueOnce(now);
    vi.mocked(decodeToken).mockReturnValueOnce({
      exp: Math.floor((now + 60_000) / 1000),
    } as ReturnType<typeof decodeToken>);

    expect(isTokenExpired("valid")).toBe(false);
  });

  it("возвращает true, если токен истёк", () => {
    const now = 1_700_000_000_000;
    nowSpy.mockReturnValueOnce(now);
    vi.mocked(decodeToken).mockReturnValueOnce({
      exp: Math.floor((now - 60_000) / 1000),
    } as ReturnType<typeof decodeToken>);

    expect(isTokenExpired("expired")).toBe(true);
  });
});
