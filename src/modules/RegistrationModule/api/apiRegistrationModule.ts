import { axiosBaseWrap } from "../../../configs/api";
import { PostNewUserResponseData } from "../../../shared/interfaces";
import { RegistrationFormData } from "../validations";

/**
 * API-модуль для регистрации нового пользователя (публичная часть)
 */
export const apiRegistrationModule = {
  /**
   * Регистрация нового пользователя
   * @param data - Данные формы регистрации
   * @returns Ответ с данными нового пользователя
   */
  postNewUser(data: RegistrationFormData): Promise<PostNewUserResponseData> {
    const { agency_title, ...userData } = data;
    const payload = {
      user: userData,
      agency: {
        title: agency_title,
      },
    };

    return axiosBaseWrap
      .post<PostNewUserResponseData>("/auth/register-agent-with-agency", payload)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
