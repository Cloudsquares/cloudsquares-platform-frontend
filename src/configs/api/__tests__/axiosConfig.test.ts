import MockAdapter from "axios-mock-adapter";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { axiosBaseWrap } from "../axiosConfig";
import { VITE_API_BASE_PATH } from "../../../constants/__mocks__/envs";

describe("axiosBaseWrap", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    // Инициализируем MockAdapter
    mock = new MockAdapter(axiosBaseWrap);
  });

  afterAll(() => {
    // Очищаем MockAdapter
    mock.restore();
  });

  it("should have the correct baseURL and headers", () => {
    // Проверяем baseURL
    expect(axiosBaseWrap.defaults.baseURL).toBe(VITE_API_BASE_PATH);

    // Проверяем Accept с учетом значений, добавляемых axios
    expect(axiosBaseWrap.defaults.headers.common.Accept).toContain(
      "application/json",
    );

    // Проверяем Content-Type в настройках по умолчанию
    expect(axiosBaseWrap.defaults.headers["Content-Type"]).toBe(
      "application/json",
    );

    // Проверяем, что Authorization по умолчанию не установлен (до установки токена)
    expect(axiosBaseWrap.defaults.headers.common.Authorization).toBeUndefined();
  });

  it("should make a GET request and return data", async () => {
    // Данные для мока
    const mockData = { message: "Success" };

    // Настраиваем mock GET-запроса
    mock.onGet("/test-endpoint").reply(200, mockData);

    // Делаем запрос
    const response = await axiosBaseWrap.get("/test-endpoint");

    // Проверяем ответ
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
  });

  it("should handle an error response", async () => {
    // Настраиваем mock GET-запроса с ошибкой
    mock.onGet("/test-error").reply(404, { error: "Not Found" });

    // Проверяем, что ошибка выбрасывается
    await expect(axiosBaseWrap.get("/test-error")).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});
