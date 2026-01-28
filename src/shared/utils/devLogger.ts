/* eslint-disable no-console */
import { ENVIRONMENT } from "@/constants/envs";

const isDev = ENVIRONMENT === "development";

// TODO: в будущем добавить Sentry, вывод ошибки пользователю через toast при необходимости
export const devLogger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (isDev) console.error(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDev) console.debug(...args);
  },
};
