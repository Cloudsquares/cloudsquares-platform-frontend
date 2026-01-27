import React from "react";
import debounce from "lodash/debounce";
import { MdSearch } from "react-icons/md";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils";

/**
 * Пропсы для компонента `BasicSearchInputField`.
 */
interface BasicSearchInputFieldProps {
  /**
   * Функция, вызываемая при изменении значения в поле поиска.
   * Используется с debounce для оптимизации запросов.
   *
   * @param value Объект с поисковым запросом `{ searchQuery: string }`
   */
  onChange: (value: { searchQuery: string }) => void;

  /** Имя поля в форме (используется для `react-hook-form`) */
  name: string;

  /** Заголовок поля (опционально) */
  label?: string;

  /** Подсказка внутри поля (опционально) */
  placeholder?: string;
}

/** Задержка debounce в миллисекундах */
const DEBOUNCE_DELAY = 333;

/**
 * Базовый компонент поля ввода с debounce, используемый для поиска.
 * Интегрируется с `react-hook-form` и вызывает `onChange` с задержкой.
 *
 * @param {BasicSearchInputFieldProps} props Пропсы компонента
 * @returns React-компонент поискового поля
 */
export const BasicSearchInputField = ({
  name,
  label,
  onChange,
  placeholder,
}: BasicSearchInputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  /**
   * Оптимизированная функция, вызываемая при изменении значения в поле.
   * Использует debounce для минимизации частых вызовов `onChange`.
   */
  const debouncedOnChange = React.useMemo(
    () =>
      debounce((value: string) => {
        onChange({ searchQuery: value });
      }, DEBOUNCE_DELAY),
    [onChange],
  );

  React.useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <MdSearch
              data-testid="SearchIcon"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-labels-secondary"
            />
            <Input
              {...field}
              ref={field.ref}
              id={name}
              placeholder={placeholder}
              className={cn("pl-9", errorMessage && "border-error")}
              hasError={Boolean(errorMessage)}
              onChange={(event) => {
                field.onChange(event);
                debouncedOnChange(event.target.value);
              }}
            />
          </div>
        )}
      />
      {errorMessage && (
        <p className="text-caption1 text-error">{errorMessage}</p>
      )}
    </div>
  );
};
