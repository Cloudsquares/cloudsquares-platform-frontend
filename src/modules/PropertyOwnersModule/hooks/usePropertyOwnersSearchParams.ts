import { useSearchParams } from "react-router-dom";

interface UsePropertyOwnersSearchParamsResult {
  /** Идентификатор объекта недвижимости */
  propertyId: string | null;
}

/**
 * Возвращает параметры поиска для базы собственников.
 *
 * @returns {UsePropertyOwnersSearchParamsResult} Параметры запроса
 */
export const usePropertyOwnersSearchParams =
  (): UsePropertyOwnersSearchParamsResult => {
    const [searchParams] = useSearchParams();

    return {
      propertyId: searchParams.get("property_id"),
    };
  };
