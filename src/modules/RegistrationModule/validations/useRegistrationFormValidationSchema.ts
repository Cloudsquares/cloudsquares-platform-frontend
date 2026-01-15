import { z } from "zod";
import { phoneRegex } from "../../../shared/constants";

/**
 * Zod-схема валидации формы регистрации агентства.
 */
export const useRegistrationFormValidationSchema = z
  .object({
    country_code: z
      .string()
      .min(1, { message: "Укажите страну" })
      .max(255, { message: "Слишком длинное значение" }),

    phone: z
      .string()
      .regex(phoneRegex, {
        message: "Телефон должен начинаться с +7 и содержать 10 цифр",
      })
      .max(12, { message: "Слишком длинный номер телефона" }),

    first_name: z
      .string()
      .min(1, { message: "Введите имя" })
      .max(255, { message: "Слишком длинное значение" }),

    last_name: z
      .string()
      .max(255, { message: "Слишком длинное значение" })
      .optional()
      .or(z.literal("")),

    middle_name: z
      .string()
      .max(255, { message: "Слишком длинное значение" })
      .optional()
      .or(z.literal("")),

    agency_title: z
      .string()
      .min(1, { message: "Введите название агентства" })
      .max(255, { message: "Слишком длинное значение" }),

    email: z
      .email({ message: "Некорректный формат email" })
      .max(255, { message: "Слишком длинное значение" }),

    password: z
      .string()
      .min(12, { message: "Пароль должен содержать минимум 12 символов" })
      .regex(/[A-Z]/, {
        message: "Пароль должен содержать хотя бы одну заглавную букву A-Z",
      })
      .regex(/[a-z]/, {
        message: "Пароль должен содержать хотя бы одну строчную букву a-z",
      })
      .regex(/\d/, {
        message: "Пароль должен содержать хотя бы одну цифру",
      })
      .regex(/[!*@#$%^&+=_-]/, {
        message:
          "Пароль должен содержать хотя бы один специальный символ (!*@#$%^&+=_-)",
      }),

    password_confirmation: z
      // .string({
      //   required_error: "Подтвердите пароль",
      //   invalid_type_error: "Подтвердите пароль",
      // })
      .string()
      .min(1, { message: "Подтвердите пароль" }),
  })
  .superRefine((data, ctx) => {
    if (
      data.password_confirmation &&
      data.password !== data.password_confirmation
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли не совпадают",
        path: ["password_confirmation"],
      });
    }
  });

export type RegistrationFormData = z.infer<
  typeof useRegistrationFormValidationSchema
>;
