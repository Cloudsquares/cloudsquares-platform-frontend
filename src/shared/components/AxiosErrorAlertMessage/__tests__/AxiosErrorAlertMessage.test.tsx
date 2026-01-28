import { render, screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import { AxiosErrorAlertMessage } from "../AxiosErrorAlertMessage";
import { ApiErrorResponse } from "../../../interfaces";

describe("AxiosErrorAlertMessage", () => {
  const consoleErrorMock = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it("отображает сообщение и код из response.data", () => {
    const error = {
      message: "Request failed",
      response: {
        data: {
          error: {
            message: "Ошибка авторизации",
            code: 401,
          },
        },
      },
    } as AxiosError<ApiErrorResponse>;

    render(<AxiosErrorAlertMessage error={error} />);

    expect(
      screen.getByText(/Ошибка получения данных с сервера/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Ошибка авторизации \| Code: 401/i),
    ).toBeInTheDocument();

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Ошибка авторизации",
      "Code: ",
      401,
    );
  });

  it("использует fallback по error.message и code 500, если response пустой", () => {
    const error = {
      message: "Network Error",
    } as AxiosError<ApiErrorResponse>;

    render(<AxiosErrorAlertMessage error={error} />);

    expect(screen.getByText(/Network Error \| Code: 500/i)).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Network Error",
      "Code: ",
      500,
    );
  });
});
