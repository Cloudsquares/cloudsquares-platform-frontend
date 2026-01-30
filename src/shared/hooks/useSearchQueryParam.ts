import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Опции для хука `useSearchQueryParam`.
 */
export interface UseSearchQueryParamOptions {
  /** Название query-параметра, по умолчанию "q" */
  paramName?: string;

  /** Название параметра страницы, который нужно сбросить на первую */
  pageParamToReset?: string;
}

/**
 * Результат хука `useSearchQueryParam`.
 */
export interface UseSearchQueryParamResult {
  /** Текущее значение поискового запроса из URL */
  query: string;

  /** Обновляет значение поискового параметра в URL */
  setQuery: (nextQuery: string) => void;
}

/**
 * Хук для синхронизации поискового параметра с URL.
 *
 * - Сохраняет `q` в query-параметрах.
 * - Удаляет параметр при пустом значении.
 * - При необходимости сбрасывает страницу на первую.
 *
 * @param {UseSearchQueryParamOptions} options Настройки хука
 * @returns {UseSearchQueryParamResult} Текущее значение и setter
 */
export const useSearchQueryParam = (
  options: UseSearchQueryParamOptions = {},
): UseSearchQueryParamResult => {
  const { paramName = "q", pageParamToReset } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(
    () => searchParams.get(paramName) ?? "",
    [paramName, searchParams],
  );

  const setQuery = useCallback(
    (nextQuery: string) => {
      const nextParams = new URLSearchParams(searchParams);
      const normalized = nextQuery.trim();

      if (normalized.length === 0) {
        nextParams.delete(paramName);
      } else {
        nextParams.set(paramName, normalized);
      }

      if (pageParamToReset) {
        nextParams.set(pageParamToReset, "1");
      }

      setSearchParams(nextParams, { replace: true });
    },
    [pageParamToReset, paramName, searchParams, setSearchParams],
  );

  return { query, setQuery };
};
