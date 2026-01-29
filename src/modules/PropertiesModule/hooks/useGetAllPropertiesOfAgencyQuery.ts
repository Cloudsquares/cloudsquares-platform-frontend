import { useAxiosQuery } from "@/configs/useAxiosQuery";
import { apiPropertiesModule } from "@/modules/PropertiesModule/apiPropertiesModule";

/**
 * Параметры пагинации для списка объектов.
 */
interface GetAllPropertiesQueryParams {
  /** Номер страницы (1-based) */
  page: number;

  /** Количество объектов на странице */
  per_page: number;
}

/**
 * Запрашивает список объектов недвижимости агентства с пагинацией.
 *
 * @param {string | undefined} agency_id Идентификатор агентства
 * @param {GetAllPropertiesQueryParams} params Параметры пагинации
 * @returns React Query результат запроса
 */
export const useGetAllPropertiesOfAgencyQuery = (
  agency_id: string | undefined,
  params: GetAllPropertiesQueryParams,
) => {
  return useAxiosQuery({
    queryFn: () =>
      apiPropertiesModule.getAllPropertiesOfAgency({
        agency_id: agency_id as string,
        ...params,
      }),
    queryKey: ["get-all-properties-of-agency", agency_id, params],
    enabled: !!agency_id,
  });
};
