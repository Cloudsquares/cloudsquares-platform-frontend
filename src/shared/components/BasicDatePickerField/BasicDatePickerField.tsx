import React from "react";
import { format } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface BasicDatePickerFieldProps {
  name: string;
  label: string;
  disablePast?: boolean;
}

/**
 * Универсальный компонент DatePicker, связанный с react-hook-form.
 *
 * @param {string} name - Имя поля для связи с react-hook-form.
 * @param {string} label - Отображаемый заголовок поля.
 * @param {boolean} disablePast - Отключает выбор прошедшей даты.
 */
export const BasicDatePickerField: React.FC<BasicDatePickerFieldProps> = ({
  name,
  label,
  disablePast = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const minDate = disablePast ? format(new Date(), "yyyy-MM-dd") : undefined;
  const fieldError = errors[name];

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            ref={field.ref}
            id={name}
            type="date"
            placeholder="Выберите дату"
            hasError={Boolean(fieldError?.message)}
            min={minDate}
            value={(field.value as string) ?? ""}
            onChange={(event) => field.onChange(event.target.value)}
          />
        )}
      />
      {fieldError?.message && (
        <p className="text-caption1 text-error">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};
