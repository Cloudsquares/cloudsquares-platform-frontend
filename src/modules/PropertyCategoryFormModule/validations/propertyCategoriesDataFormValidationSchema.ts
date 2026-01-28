import { z } from "zod";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";

// const POSITION_MAX_VALUE = 1000;

export const createPropertyCategoriesDataFormSchema = (
  mode: BasicDrawerMode,
) => {
  void mode;
  return z.object({
    title: z
      .string()
      .min(3, { message: "Введите название категории" })
      .max(255),
    // position: z.number().min(1).max(POSITION_MAX_VALUE), // TODO: использовать, когда будет drag and drop для управления порядком
    parent_id: z.string().max(255).optional().or(z.literal("")),
  });
};

export type PropertyCategoriesDataFormData = z.infer<
  ReturnType<typeof createPropertyCategoriesDataFormSchema>
>;
