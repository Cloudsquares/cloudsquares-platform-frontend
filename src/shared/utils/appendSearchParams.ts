/**
 * Добавляет необязательные параметры в URLSearchParams.
 *
 * @param {URLSearchParams} params Существующие параметры
 * @param {Record<string, string | number | null | undefined>} values Пары параметров
 * @returns {URLSearchParams} Обновлённые параметры
 */
export const appendSearchParams = (
  params: URLSearchParams,
  values: Record<string, string | number | null | undefined>,
): URLSearchParams => {
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    params.set(key, String(value));
  });

  return params;
};
