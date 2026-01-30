import React from "react";

import {
  SearchInputForm,
  type SearchInputFormData,
} from "@/shared/components/SearchInputForm";
import { useSearchQueryParam } from "@/shared/hooks";
import { cn } from "@/shared/utils";

export interface SearchInputWrapperProps {
  /** Текст плейсхолдера для поиска */
  placeholder?: string;

  /** Максимальная длина значения */
  maxLength?: number;

  /** Дополнительные классы контейнера */
  className?: string;

  /** Параметр страницы для сброса на первую */
  pageParamToReset?: string;

  /** Текущее значение (для локального/контролируемого поиска) */
  query?: string;

  /** Обработчик изменения запроса (для локального/контролируемого поиска) */
  onQueryChange?: (query: string) => void;
}

/**
 * Унифицированная обёртка над `SearchInputForm`.
 *
 * Поддерживает синхронизацию с URL или управляемое состояние,
 * а также сброс страницы при изменении запроса.
 *
 * @param {SearchInputWrapperProps} props Пропсы компонента
 * @returns React-компонент с поисковым инпутом
 */
export const SearchInputWrapper = ({
  placeholder = "Поиск",
  maxLength = 256,
  className,
  pageParamToReset,
  query,
  onQueryChange,
}: SearchInputWrapperProps) => {
  const { query: urlQuery, setQuery: setUrlQuery } = useSearchQueryParam({
    pageParamToReset,
  });

  const isControlled = Boolean(onQueryChange);
  const resolvedQuery = isControlled ? (query ?? "") : urlQuery;

  const handleSearch = React.useCallback(
    ({ searchQuery }: SearchInputFormData) => {
      if (onQueryChange) {
        onQueryChange(searchQuery);
        return;
      }

      setUrlQuery(searchQuery);
    },
    [onQueryChange, setUrlQuery],
  );

  return (
    <div className={cn("w-full", className)}>
      <SearchInputForm
        sendRequest={handleSearch}
        placeholder={placeholder}
        defaultValue={resolvedQuery}
        maxLength={maxLength}
      />
    </div>
  );
};
