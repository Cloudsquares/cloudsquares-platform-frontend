import { axiosBaseWrap } from "@/configs/api";
import { SortDirection, SortingTypes } from "@/shared/interfaces/Basic";
import {
  AllPropertyOwnersResponseData,
  PropertyOwnerRole,
} from "@/shared/interfaces/PropertyOwner";
import { appendSearchParams } from "@/shared/utils";

export type PropertyOwnersAllowedSort = "phone" | "role";

export interface GetAllPropertyOwnersProps {
  /** Идентификатор объекта недвижимости */
  property_id: string;

  /** Количество заявок на странице */
  per_page: number;

  /** Номер страницы */
  page: number;

  /** Поисковый запрос */
  q?: string;

  /** (Необязательно) Фильтр по номеру телефона */
  phone?: string;

  /** (Необязательно) Фильтр по роли пользователя */
  role?: PropertyOwnerRole;

  /** (Необязательно) Поле для сортировки */
  sort_by?: SortingTypes & PropertyOwnersAllowedSort;

  /** (Необязательно) Тип сортировки */
  sort_dir?: SortDirection;
}

export const apiPropertyOwnersModule = {
  /**
   * Получает список собственников недвижимости для выбранного объекта.
   *
   * @param {GetAllPropertyOwnersProps} params Параметры запроса для фильтрации и пагинации.
   * @returns {Promise<AllPropertyOwnersResponseData>} Промис с данными списка собственников.
   */
  getAllPropertyOwners({
    property_id,
    page,
    per_page,
    q,
    phone,
    role,
    sort_by,
    sort_dir,
  }: GetAllPropertyOwnersProps): Promise<AllPropertyOwnersResponseData> {
    const params = appendSearchParams(
      new URLSearchParams({
        page: String(page),
        per_page: String(per_page),
      }),
      {
        q,
        phone,
        role,
        sort_by,
        sort_dir,
      },
    );

    return axiosBaseWrap
      .get(`/properties/${property_id}/owners?${params.toString()}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
