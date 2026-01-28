import { jwtDecode } from "jwt-decode";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UserRole } from "@/shared/permissions/roles";
import { decodeToken } from "@/shared/utils/decodeToken";
import { devLogger } from "@/shared/utils/devLogger";

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(),
}));

vi.mock("@/shared/utils/devLogger", () => ({
  devLogger: {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

describe("decodeToken", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает декодированные данные токена", () => {
    const decoded = {
      fresh: true,
      iat: 1,
      jti: "id",
      type: "access" as const,
      sub: "sub",
      nbf: 1,
      csrf: "csrf",
      exp: 9999999999,
      role: UserRole.admin,
      phone: "+77001234567",
      first_name: "Test",
    };

    vi.mocked(jwtDecode).mockReturnValueOnce(decoded);

    expect(decodeToken("token")).toEqual(decoded);
    expect(jwtDecode).toHaveBeenCalledWith("token");
  });

  it("возвращает null и логирует ошибку, если декодирование не удалось", () => {
    vi.mocked(jwtDecode).mockImplementationOnce(() => {
      throw new Error("invalid token");
    });

    expect(decodeToken("broken-token")).toBeNull();
    expect(devLogger.error).toHaveBeenCalledWith(
      "Ошибка декодирования токена",
      expect.any(Error),
    );
  });
});
