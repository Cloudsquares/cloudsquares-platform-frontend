import { useAxiosQuery } from "@/configs/useAxiosQuery";
import { apiSharedPropertyCategories } from "@/shared/api";

/**
 * Запрашивает список категорий недвижимости с учётом поиска.
 *
 * @param {string | undefined} agency_id Идентификатор агентства
 * @param {string | undefined} query Поисковый запрос
 * @returns React Query результат запроса
 */
export const useGetAllPropertyCategoriesQuery = (
  agency_id: string | undefined,
  query?: string,
) => {
  return useAxiosQuery({
    queryFn: () =>
      apiSharedPropertyCategories.getAllPropertyCategories({
        agency_id: agency_id as string,
        q: query,
      }),
    queryKey: ["get-all-property-categories", agency_id, query],
    enabled: !!agency_id,
  });
};
