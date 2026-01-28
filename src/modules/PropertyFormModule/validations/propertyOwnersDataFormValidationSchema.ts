import { z } from "zod";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { phoneRegex } from "@/shared/constants";

export const createPropertyOwnersDataFormSchema = (mode: PropertyFormMode) => {
  void mode;
  return z.object({
    first_name: z
      .string()
      .min(2, { error: "Пожалуйста, укажите имя" })
      .max(255),
    last_name: z.string().max(255).optional().or(z.literal("")),
    middle_name: z.string().max(255).optional().or(z.literal("")),
    phone: z
      .string()
      .min(12, {
        message:
          "Введите корректный номер телефона. Номер должен начинаться с +7.",
      })
      .regex(phoneRegex, {
        message: "Телефон должен начинаться с +7 и содержать 10 цифр",
      })
      .max(12, { message: "Слишком длинный номер телефона" }),
    email: z
      .email({ message: "Некорректный формат email" })
      .max(255, { message: "Слишком длинное значение" })
      .optional()
      .or(z.literal("")),
    notes: z.string().max(1000).optional().or(z.literal("")),
    role: z.string().min(1).max(255),
    user_id: z.uuid().optional().or(z.literal("")),
  });
};

export type PropertyOwnersDataFormData = z.infer<
  ReturnType<typeof createPropertyOwnersDataFormSchema>
>;
