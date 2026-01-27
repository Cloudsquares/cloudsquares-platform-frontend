import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "subtitle1",
            "subtitle2",
            "body1",
            "body2",
            "body3",
            "body4",
            "caption1",
            "caption2",
            "caption3",
          ],
        },
      ],
    },
  },
});

/**
 * @description Объединяет классы CSS и корректно сливает Tailwind-модификаторы.
 *
 * @param inputs - Набор строк, массивов или условных значений классов.
 * @returns Строка классов с учётом приоритетов Tailwind.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
