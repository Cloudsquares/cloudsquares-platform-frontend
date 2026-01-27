import * as React from "react";
import { Controller, useFormContext, FieldErrors } from "react-hook-form";

import { extractDigits, formatWithSpaces } from "./utils/number";
import { preventNonDigitKeydown } from "./utils/keys";
import { getCurrencySymbol } from "./utils/currency";
import { useUserProfile } from "@/shared/permissions/hooks";
import { cn } from "@/shared/utils";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

interface BasicTextFieldProps<T extends Record<string, unknown>> {
  name: keyof T & string;
  label: string;

  /** Подсказка (placeholder) внутри поля ввода */
  placeholder: string;

  /** Тип HTML-инпута (например, "text", "password", "email") */
  type?: React.HTMLInputTypeAttribute;

  /** Состояние поля */
  disabled?: boolean;

  /** Размер инпута TextField */
  size?: "small" | "medium";

  /** Подсказка под инпутом */
  helperText?: React.ReactNode;

  /** Необходимый параметры для доступности полей в браузере */
  inputName?: string;
  autoComplete?: string;
  multiline?: boolean;
  minRows?: string | number;
  onClick?: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Показать ли символ валюты слева (работает, когда type="number") */
  showCurrency?: boolean;
}

export const BasicTextField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  type,
  disabled,
  size = "medium",
  helperText,
  inputName,
  autoComplete,
  multiline,
  minRows,
  onClick,
  showCurrency = false,
}: BasicTextFieldProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = (errors as FieldErrors<T>)[name];

  const profile = useUserProfile();
  const currencySymbol = getCurrencySymbol(profile?.country_code);

  const isNumeric = type === "number";
  const inputId = inputName ?? name;
  const sizeClassName = size === "small" ? "h-9 text-body3" : "h-11 text-body2";
  const helperMessage = (fieldError?.message as string) || helperText;
  const hasError = Boolean(fieldError?.message);

  return (
    <Controller
      name={name}
      render={({ field }) => {
        const inputRef = field.ref;
        const onBlur = field.onBlur;

        const value = (() => {
          if (!isNumeric) return (field.value as string) ?? "";
          if (typeof field.value === "number")
            return formatWithSpaces(field.value);
          if (typeof field.value === "string" && field.value !== "") {
            return formatWithSpaces(Number(extractDigits(field.value)));
          }
          return "";
        })();

        const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
          event,
        ) => {
          if (!isNumeric) {
            field.onChange(event);
            return;
          }
          const digits = extractDigits(event.target.value);
          const nextValue = digits === "" ? undefined : Number(digits);
          field.onChange(nextValue as unknown as T[keyof T]);
        };

        const handleTextareaChange: React.ChangeEventHandler<
          HTMLTextAreaElement
        > = (event) => {
          field.onChange(event);
        };

        const effectiveType = isNumeric ? "text" : type;

        const sharedInputProps = {
          id: inputId,
          name: inputId,
          autoComplete,
          placeholder,
          disabled,
          onBlur,
          value,
          className: cn(sizeClassName, showCurrency && isNumeric && "pr-10"),
          hasError,
        };

        return (
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor={inputId}>{label}</Label>
            <div className="relative">
              {multiline ? (
                <Textarea
                  {...sharedInputProps}
                  ref={inputRef}
                  onClick={
                    onClick as React.MouseEventHandler<HTMLTextAreaElement>
                  }
                  onChange={handleTextareaChange}
                  rows={(() => {
                    if (typeof minRows === "number") return minRows;
                    if (!minRows) return undefined;
                    const parsed = Number(minRows);
                    return Number.isNaN(parsed) ? undefined : parsed;
                  })()}
                />
              ) : (
                <Input
                  {...sharedInputProps}
                  ref={inputRef}
                  type={effectiveType}
                  onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
                  onChange={handleInputChange}
                  inputMode={isNumeric ? "numeric" : undefined}
                  onKeyDown={isNumeric ? preventNonDigitKeydown : undefined}
                  onWheel={
                    isNumeric
                      ? (event: React.WheelEvent<HTMLInputElement>) => {
                          event.currentTarget.blur();
                        }
                      : undefined
                  }
                />
              )}
              {isNumeric && showCurrency && (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-body3 text-labels-primary">
                  {currencySymbol}
                </span>
              )}
            </div>
            {helperMessage && (
              <p
                className={cn(
                  "text-caption1",
                  hasError ? "text-error" : "text-labels-secondary",
                )}
              >
                {helperMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
