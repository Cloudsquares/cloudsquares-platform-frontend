import React from "react";

import type { PropertyOwner } from "@/shared/interfaces/PropertyOwner";
import { createOwnerSearchText } from "@/modules/PropertyDetailsModule/utils/createOwnerSearchText";

interface UsePropertyOwnersSearchResult {
  /** Поисковый запрос */
  searchQuery: string;

  /** Обновляет поисковый запрос */
  setSearchQuery: (value: string) => void;

  /** Отфильтрованные собственники */
  filteredOwners: PropertyOwner[];

  /** Есть ли активный поисковый запрос */
  hasSearchQuery: boolean;
}

/**
 * Хук для локального поиска по списку собственников.
 *
 * @param {PropertyOwner[]} owners Список собственников
 * @returns {UsePropertyOwnersSearchResult} Результат поиска и сеттер
 */
export const usePropertyOwnersSearch = (
  owners: PropertyOwner[] = [],
): UsePropertyOwnersSearchResult => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredOwners = React.useMemo(() => {
    if (!normalizedQuery) return owners;

    return owners.filter((owner) =>
      createOwnerSearchText(owner).includes(normalizedQuery),
    );
  }, [normalizedQuery, owners]);

  return {
    searchQuery,
    setSearchQuery,
    filteredOwners,
    hasSearchQuery: normalizedQuery.length > 0,
  };
};
