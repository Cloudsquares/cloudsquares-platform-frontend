import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Параметры для хука `usePagination`.
 */
export interface UsePaginationOptions {
  /** Количество строк на странице по умолчанию */
  defaultRowsPerPage?: number;

  /** Ключ для хранения `rowsPerPage` в localStorage */
  rowsPerPageKey: string;

  /** Название query-параметра страницы */
  pageParam?: string;
}

/**
 * Нормализует значение страницы из query-параметров.
 *
 * @param {string | null} value Значение из query-параметра
 * @returns {number} Номер страницы в формате 0-based
 */
const normalizePageValue = (value: string | null) => {
  if (!value) return 0;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 0;
  return Math.floor(parsed) - 1;
};

/**
 * Хук для управления пагинацией с хранением `rowsPerPage` в localStorage
 * и синхронизацией страницы с URL.
 *
 * @param {UsePaginationOptions} options Параметры пагинации
 * @returns Объект с текущими значениями и обработчиками пагинации
 */
export const usePagination = ({
  defaultRowsPerPage = 5,
  rowsPerPageKey,
  pageParam = "page",
}: UsePaginationOptions) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = useMemo(
    () => normalizePageValue(searchParams.get(pageParam)),
    [pageParam, searchParams],
  );

  const [page, setPageState] = useState(pageFromUrl);
  const [rowsPerPage, setRowsPerPageState] = useState(() => {
    const savedRowsPerPage = localStorage.getItem(rowsPerPageKey);
    if (!savedRowsPerPage) return defaultRowsPerPage;
    const parsedRowsPerPage = Number(savedRowsPerPage);
    return Number.isFinite(parsedRowsPerPage) && parsedRowsPerPage > 0
      ? parsedRowsPerPage
      : defaultRowsPerPage;
  });

  useEffect(() => {
    if (page !== pageFromUrl) setPageState(pageFromUrl);
  }, [page, pageFromUrl]);

  const updateSearchParams = useCallback(
    (nextPage: number) => {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set(pageParam, String(nextPage + 1));
      setSearchParams(nextParams, { replace: true });
    },
    [pageParam, searchParams, setSearchParams],
  );

  /**
   * Обновляет текущую страницу и синхронизирует её с URL.
   *
   * @param {number} nextPage Новая страница (0-based)
   */
  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      updateSearchParams(nextPage);
    },
    [updateSearchParams],
  );

  /**
   * Обновляет количество строк на странице и сохраняет в localStorage.
   *
   * @param {number} nextRowsPerPage Новое количество строк
   */
  const setRowsPerPage = useCallback(
    (nextRowsPerPage: number) => {
      setRowsPerPageState(nextRowsPerPage);
      localStorage.setItem(rowsPerPageKey, String(nextRowsPerPage));
      setPage(0);
    },
    [rowsPerPageKey, setPage],
  );

  return {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
  };
};
