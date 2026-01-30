import { axiosBaseWrap } from "@/configs/api";
import { PropertyCategory } from "@/shared/interfaces/PropertyCategory";

/**
 * Параметры запроса списка категорий недвижимости.
 */
interface GetAllPropertyCategoriesParams {
  /** Идентификатор агентства */
  agency_id: string;

  /** Поисковый запрос */
  q?: string;
}

export const apiSharedPropertyCategories = {
  getAllPropertyCategories: ({
    agency_id,
    q,
  }: GetAllPropertyCategoriesParams): Promise<PropertyCategory[]> => {
    const params = new URLSearchParams({ agency_id });

    if (q) {
      params.set("q", q);
    }

    return axiosBaseWrap
      .get(`/property_categories?${params.toString()}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
