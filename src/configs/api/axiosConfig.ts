import axios from "axios";
import toast from "react-hot-toast";

import { VITE_API_BASE_PATH } from "@/constants/envs";
import { useLoginStore } from "@/modules/LoginModule/store";
import { decodeToken, refreshAccessToken } from "@/shared/utils";

const API_BASE_PATH = VITE_API_BASE_PATH;
const REQUEST_TIMEOUT = 10000;

export const axiosBaseWrap = axios.create({
  baseURL: API_BASE_PATH,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Добавляет `access_token` и CSRF-токен в каждый запрос
 */
axiosBaseWrap.interceptors.request.use((config) => {
  const token = useLoginStore.getState().accessToken;

  if (token) {
    const decoded = decodeToken(token);
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["X-CSRF-Token"] = decoded?.csrf;
  }

  return config;
});

/**
 * Флаг, чтобы избежать повторного вызова `refreshAccessToken`
 */
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Обрабатывает ошибки ответа, обновляет токен при 401 статусе
 */
axiosBaseWrap.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // todo: проверить это во время обновления токена
    const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");

    // ⚠️ Пробрасываем ошибку дальше, если 401 произошел при попытке обновить токен
    if (status === 401 && isRefreshRequest) {
      return Promise.reject(error);
    }

    // Обрабатываем ошибки сети
    if (!error.response) {
      if (error.message.includes("Network Error")) {
        toast.error("Отсутствует подключение к интернету.");
      } else if (error.code === "ECONNABORTED") {
        toast.error(
          "Не удалось подключиться к серверу. Повторите попытку позже.",
        );
      } else {
        toast.error("Произошла непредвиденная ошибка сети.");
      }
      return Promise.reject(error);
    }

    // Не пытаемся обновлять токен, если это ошибка авторизации по логину/паролю
    if (status === 401 && originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // Если получили 401 и токен истек — пытаемся обновить токен
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;

          if (newToken) {
            refreshSubscribers.forEach((callback) =>
              callback(newToken.access_token),
            );
            refreshSubscribers = [];
            useLoginStore
              .getState()
              .setAccessToken(newToken.access_token, newToken.refresh_token);
            return axiosBaseWrap(originalRequest);
          }
        } catch (err) {
          isRefreshing = false;
          refreshSubscribers = [];
          useLoginStore.getState().logout();
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosBaseWrap(originalRequest));
        });
      });
    }

    // Обработка серверных ошибок
    switch (status) {
      case 403:
        toast.error("У вас недостаточно прав для выполнения этого действия.");
        break;
      case 429:
        toast.error("Слишком много запросов. Попробуйте позже.");
        break;
      case 500:
        throw error;
      // default:
      //   toast.error("Произошла ошибка. Пожалуйста, попробуйте снова.");
    }

    return Promise.reject(error);
  },
);
