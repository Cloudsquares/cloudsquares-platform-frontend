import { axiosBaseWrap } from "@/configs/api";
import { AllPropertiesResponseData } from "@/shared/interfaces/Property";

/**
 * Параметры запроса всех объектов недвижимости агентства.
 */
interface GetAllPropertiesOfAgencyParams {
  /** Идентификатор агентства */
  agency_id: string;

  /** Номер страницы (1-based) */
  page: number;

  /** Количество объектов на странице */
  per_page: number;

  /** Поисковый запрос */
  q?: string;
}

export const apiPropertiesModule = {
  /**
   * Запрос на получение всех объектов недвижимости текущего агентства недвижимости.
   * TODO: убрать айди из параметров, бекенд должен определять по токну авторизации
   *
   * @param {GetAllPropertiesOfAgencyParams} params Параметры фильтрации и пагинации
   * @returns Промис с данными объектов недвижимости
   */
  getAllPropertiesOfAgency({
    agency_id,
    page,
    per_page,
    q,
  }: GetAllPropertiesOfAgencyParams): Promise<AllPropertiesResponseData> {
    const params = new URLSearchParams({
      agency_id,
      page: String(page),
      per_page: String(per_page),
    });

    if (q) {
      params.set("q", q);
    }

    return axiosBaseWrap
      .get(`/properties?${params.toString()}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
