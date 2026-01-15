import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description Объединяет классы CSS и корректно сливает Tailwind-модификаторы.
 *
 * @param inputs - Набор строк, массивов или условных значений классов.
 * @returns Строка классов с учётом приоритетов Tailwind.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
