import { useAxiosQuery } from "@/configs/useAxiosQuery";
import { apiPropertyOwnersModule } from "@/modules/PropertyOwnersModule/api";

/**
 * Параметры запроса для получения списка всех собственников.
 */
interface GetAllPropertyOwnersQueryParams {
  /** Идентификатор объекта недвижимости */
  property_id: string;

  /** Количество собственников, которые нужно получить */
  per_page: number;

  /** Смещение (page) для пагинации */
  page: number;

  /** Поисковый запрос */
  q?: string;
}

export const useGetAllPropertyOwnersQuery = ({
  property_id,
  per_page,
  page,
  q,
}: GetAllPropertyOwnersQueryParams) => {
  return useAxiosQuery({
    queryFn: () =>
      apiPropertyOwnersModule.getAllPropertyOwners({
        property_id,
        page,
        per_page,
        q,
      }),
    queryKey: ["get-all-property-owners", property_id, page, per_page, q],
    enabled: Boolean(property_id),
  });
};
