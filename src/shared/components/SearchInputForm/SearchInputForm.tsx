import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BasicSearchInputField } from "../BasicSearchInputField";

/**
 * Схема валидации для формы поиска.
 *
 * - `searchQuery` - строка, максимум 255 символов.
 */
export const SearchInputFormSchema = z.object({
  searchQuery: z.string().max(30, { message: "Слишком длинное значение" }),
});

/** Тип данных, используемый в форме поиска. */
export type SearchInputFormData = z.infer<typeof SearchInputFormSchema>;

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
}: SearchInputFormProps) => {
  const methods = useForm<SearchInputFormData>({
    resolver: zodResolver(SearchInputFormSchema),
    defaultValues: { searchQuery: "" },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div>
        <BasicSearchInputField
          onChange={sendRequest}
          name="searchQuery"
          placeholder={placeholder}
        />
      </div>
    </FormProvider>
  );
};
