import { UserStatus } from "../interfaces/User";

type UserStatusColor = "success" | "warning" | "error" | "info";

/**
 * Возвращает человекочитаемую метку статуса пользователя.
 *
 * @param {UserStatus} status - Статус пользователя из API.
 * @returns {string} Лейбл статуса для UI.
 */
export const getUserStatusLabel = (status: UserStatus): string => {
  const labels: Record<UserStatus, string> = {
    [UserStatus.active]: "Активный",
    [UserStatus.banned]: "Заблокирован",
    [UserStatus.pending]: "Ожидает подтверждения",
    [UserStatus.verification_required]: "Требуется верификация",
    [UserStatus.deactivated]: "Деактивирован",
  };

  return labels[status];
};

/**
 * Возвращает цвет для чипа статуса пользователя.
 *
 * @param {UserStatus} status - Статус пользователя из API.
 * @returns {UserStatusColor} Цвет, соответствующий статусу.
 */
export const getUserStatusChipColor = (status: UserStatus): UserStatusColor => {
  const colors: Record<UserStatus, UserStatusColor> = {
    [UserStatus.active]: "success",
    [UserStatus.banned]: "error",
    [UserStatus.pending]: "warning",
    [UserStatus.verification_required]: "warning",
    [UserStatus.deactivated]: "error",
  };

  return colors[status];
};

/**
 * Возвращает приоритет сортировки для статуса пользователя.
 *
 * @param {UserStatus} status - Статус пользователя из API.
 * @returns {number} Число для сортировки: меньше -> выше в списке.
 */
export const getUserStatusPriority = (status: UserStatus): number => {
  const priorities: Record<UserStatus, number> = {
    [UserStatus.active]: 0,
    [UserStatus.pending]: 1,
    [UserStatus.verification_required]: 2,
    [UserStatus.banned]: 3,
    [UserStatus.deactivated]: 4,
  };

  return priorities[status];
};

/**
 * Проверяет, является ли статус активным.
 *
 * @param {UserStatus} status - Статус пользователя из API.
 * @returns {boolean} True, если пользователь активен.
 */
export const isActiveUserStatus = (status: UserStatus): boolean => {
  return status === UserStatus.active;
};
