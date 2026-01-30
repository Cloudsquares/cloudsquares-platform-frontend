import type { PropertyOwner } from "@/shared/interfaces/PropertyOwner";

/**
 * Формирует строку для поиска по собственнику.
 *
 * @param {PropertyOwner} owner Данные собственника
 * @returns {string} Строка для поиска
 */
export const createOwnerSearchText = (owner: PropertyOwner): string => {
  const parts = [
    owner.first_name,
    owner.last_name,
    owner.middle_name,
    owner.phone,
    owner.email,
  ];

  return parts
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();
};
