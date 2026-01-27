import { Controller, FieldErrors, useFormContext, Path } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils";

// todo: Сделать по размерам таким же, как <BasicTextField />

/**
 * Пропсы для компонента `BasicFormSelectField`.
 */
interface BasicFormSelectFieldProps<T extends Record<string, unknown>> {
  /** Имя поля в форме (используется для `react-hook-form`) */
  name: Path<T>;

  /** Заголовок, отображаемая над полем */
  label?: string;

  /** Текст-заполнитель (placeholder), отображаемый при пустом значении */
  placeholder: string;

  /** Массив значений для выпадающего списка */
  data: { value: string; label: string }[];

  /** Флаг блокировки выбора (`true` - поле заблокировано) */
  disabled?: boolean;

  /** Опции для кнопки в селекте, если переданы, то будет отображена кнопка с заданным текстом и вызовом переданной функции */
  buttonOptions?: {
    buttonLabel: string;
    onButtonClick: () => void;
    buttonColor?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
  };
}

const buttonColorClasses = {
  inherit: "border-border text-foreground hover:bg-secondary",
  primary: "border-primary text-primary hover:bg-primary/10",
  secondary: "border-border text-foreground hover:bg-secondary",
  success: "border-success text-success hover:bg-success/10",
  error: "border-error text-error hover:bg-error/10",
  info: "border-accent text-accent hover:bg-accent/10",
  warning: "border-accent text-accent hover:bg-accent/10",
} satisfies Record<string, string>;

/**
 * Компонент выпадающего списка (select) с интеграцией `react-hook-form`.
 *
 * @param {BasicFormSelectFieldProps} props Пропсы компонента
 * @returns React-компонент `Select` с `react-hook-form`
 */
export const BasicFormSelectField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  data,
  buttonOptions,
  disabled = false,
}: BasicFormSelectFieldProps<T>) => {
  const { formState, control } = useFormContext<T>();
  const { errors } = formState;
  const fieldError = (errors as FieldErrors<T>)[name];
  const hasError = Boolean(fieldError?.message);

  const EMPTY_VALUE = "__empty__";

  const triggerId = `${name}-select`;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className="text-body1" htmlFor={triggerId}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValue = field.value as string;
          const selectedOption = data.find(
            (item) => item.value === selectedValue,
          );
          const buttonColor = buttonOptions?.buttonColor ?? "primary";
          const normalizedValue =
            selectedValue === undefined
              ? undefined
              : selectedValue === ""
                ? EMPTY_VALUE
                : selectedValue;

          return (
            <Select
              value={normalizedValue}
              onValueChange={(value: string) =>
                field.onChange(value === EMPTY_VALUE ? "" : value)
              }
              disabled={disabled}
            >
              <SelectTrigger
                id={triggerId}
                aria-invalid={hasError}
                className={cn(
                  hasError && "border-error focus-visible:ring-error",
                )}
              >
                <span
                  className={cn(
                    "truncate",
                    selectedOption
                      ? "text-foreground"
                      : "text-labels-secondary",
                  )}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => {
                  const itemValue =
                    item.value === "" ? EMPTY_VALUE : item.value;

                  return (
                    <SelectItem key={itemValue} value={itemValue}>
                      {item.label}
                    </SelectItem>
                  );
                })}
                {buttonOptions && (
                  <div className="border-t border-border px-2 py-2">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full md:w-fit",
                        buttonColorClasses[buttonColor],
                      )}
                      onClick={buttonOptions.onButtonClick}
                    >
                      {buttonOptions.buttonLabel}
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
          );
        }}
      />
      {fieldError && (
        <p className="text-caption1 text-error">
          {fieldError?.message as string}
        </p>
      )}
    </div>
  );
};
