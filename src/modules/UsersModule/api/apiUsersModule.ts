import { axiosBaseWrap } from "@/configs/api";
import { User } from "@/shared/interfaces";

/**
 * Параметры запроса списка пользователей.
 */
interface GetAllUsersParams {
  /** Поисковый запрос */
  q?: string;
}

export const apiUsersModule = {
  getAllUsers({ q }: GetAllUsersParams = {}): Promise<User[]> {
    const params = new URLSearchParams();

    if (q) {
      params.set("q", q);
    }

    const query = params.toString();
    const url = query ? `/users?${query}` : "/users";

    return axiosBaseWrap
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  deleteUserById(id: string) {
    return axiosBaseWrap
      .delete("/users/" + id)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
