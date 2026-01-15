import { axiosBaseWrap } from "../../../configs/api";
import { PostNewUserResponseData } from "../../../shared/interfaces";
import { RegistrationFormData } from "../validations";

/**
 * API-модуль для регистрации агентства и администратора.
 */
export const apiRegistrationModule = {
  /**
   * Регистрирует агента с агентством через публичный эндпоинт.
   *
   * Формирует payload вида `{ user, agency }` и отправляет его на
   * `/auth/register-agent-with-agency`.
   *
   * @param data Данные формы регистрации
   * @returns Ответ с данными нового пользователя и токенами
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
      .post<PostNewUserResponseData>(
        "/auth/register-agent-with-agency",
        payload,
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
