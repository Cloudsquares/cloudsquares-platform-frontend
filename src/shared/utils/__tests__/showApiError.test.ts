import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiErrorResponse } from "@/shared/interfaces";
import { showApiError } from "@/shared/utils/showApiError";

vi.mock("react-hot-toast", () => {
  const mockToast = Object.assign(vi.fn(), {
    error: vi.fn(),
  });

  return {
    __esModule: true,
    default: mockToast,
  };
});

describe("showApiError", () => {
  const createError = (
    error: Partial<ApiErrorResponse["error"]>,
  ): AxiosError<ApiErrorResponse> =>
    ({
      response: {
        data: {
          error: {
            message: error.message,
            details: error.details,
            code: 0,
            key: "",
            status: "error",
          },
        },
      },
    }) as AxiosError<ApiErrorResponse>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("рендерит отдельный toast для каждой ошибки из details", () => {
    const error = createError({
      message: "Валидация",
      details: {
        email: ["Неверный формат"],
        phone: ["Обязательное поле"],
      },
    });

    showApiError(error, "Ошибка");

    expect(toast.error).toHaveBeenNthCalledWith(1, "Ошибка: Неверный формат");
    expect(toast.error).toHaveBeenNthCalledWith(2, "Ошибка: Обязательное поле");
  });

  it("использует общее сообщение, если details отсутствует", () => {
    const error = createError({
      message: "Что-то пошло не так",
      details: undefined,
    });

    showApiError(error, "Ошибка выполнения");

    expect(toast.error).toHaveBeenCalledWith(
      "Ошибка выполнения: Что-то пошло не так",
    );
  });

  it("показывает сообщение по умолчанию и увеличивает длительность, если details пустой", () => {
    const error = createError({
      message: undefined,
      details: {
        email: [null as unknown as string],
      },
    });

    showApiError(error, "Ошибка");

    expect(toast.error).toHaveBeenCalledWith("Ошибка: Неизвестная ошибка", {
      duration: 10000,
    });
  });
});
