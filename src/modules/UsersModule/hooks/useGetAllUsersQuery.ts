import { useAxiosQuery } from "@/configs/useAxiosQuery";
import { apiUsersModule } from "@/modules/UsersModule/api";

/**
 * Запрашивает список сотрудников с учётом поискового запроса.
 *
 * @param {string | undefined} query Поисковая строка
 * @returns React Query результат запроса
 */
export const useGetAllUsersQuery = (query?: string) => {
  return useAxiosQuery({
    queryFn: () => apiUsersModule.getAllUsers({ q: query }),
    queryKey: ["get-all-users", query],
  });
};
