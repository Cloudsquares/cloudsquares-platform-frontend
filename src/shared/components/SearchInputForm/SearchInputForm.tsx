import React from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BasicSearchInputField } from "@/shared/components/BasicSearchInputField";
import type { InputProps } from "@/shared/components/ui";

/**
 * Схема валидации для формы поиска.
 *
 * - `searchQuery` - строка с ограничением длины.
 *
 * @param {number} maxLength Максимальная длина строки
 * @returns Zod-схема формы поиска
 */
const createSearchInputFormSchema = (maxLength: number) =>
  z.object({
    searchQuery: z
      .string()
      .max(maxLength, { message: "Слишком длинное значение" }),
  });

/** Тип данных, используемый в форме поиска. */
export type SearchInputFormData = {
  searchQuery: string;
};

/**
 * Пропсы для компонента `SearchInputForm`.
 */
interface SearchInputFormProps {
  /**
   * Функция для обработки отправки поискового запроса.
   *
   * @param v Данные формы поиска `{ searchQuery: string }`
   */
  sendRequest: (v: SearchInputFormData) => void;

  /**
   * Текст внутри инпута
   */
  placeholder?: string;

  /**
   * Размер инпута
   */
  size?: InputProps["size"];

  /**
   * Значение по умолчанию, синхронизируемое с URL.
   */
  defaultValue?: string;

  /**
   * Максимальная длина значения
   */
  maxLength?: number;
}

/**
 * Форма поиска для использования в таблицах.
 *
 * - Использует `react-hook-form` с `zod` для валидации.
 * - Вызывает `sendRequest`, передавая введённый запрос.
 *
 * @param {SearchInputFormProps} props Пропсы компонента
 * @returns React-компонент формы поиска
 */
export const SearchInputForm = ({
  sendRequest,
  placeholder = "Поиск",
  size = "md",
  defaultValue,
  maxLength = 256,
}: SearchInputFormProps) => {
  const normalizedDefaultValue = defaultValue ?? "";
  const schema = React.useMemo(
    () => createSearchInputFormSchema(maxLength),
    [maxLength],
  );
  const methods = useForm<SearchInputFormData>({
    resolver: zodResolver(schema),
    defaultValues: { searchQuery: normalizedDefaultValue },
    mode: "onChange",
  });

  React.useEffect(() => {
    methods.reset({ searchQuery: normalizedDefaultValue });
  }, [methods, normalizedDefaultValue]);

  const handleSearch = React.useCallback(
    (value: SearchInputFormData) => {
      const { invalid } = methods.getFieldState("searchQuery");
      if (invalid) return;

      sendRequest(value);
    },
    [methods, sendRequest],
  );

  return (
    <FormProvider {...methods}>
      <div>
        <BasicSearchInputField
          onChange={handleSearch}
          name="searchQuery"
          placeholder={placeholder}
          size={size}
          maxLength={maxLength}
        />
      </div>
    </FormProvider>
  );
};
