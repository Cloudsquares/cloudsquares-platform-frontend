import {
  getUserStatusChipColor,
  getUserStatusLabel,
  getUserStatusPriority,
  isActiveUserStatus,
} from "@/shared/utils/userStatus";
import { UserStatus } from "@/shared/interfaces";

const STATUSES = [
  UserStatus.active,
  UserStatus.banned,
  UserStatus.pending,
  UserStatus.verification_required,
  UserStatus.deactivated,
] as const;

describe("userStatus utils", () => {
  it("возвращает корректные лейблы статусов", () => {
    const labels = STATUSES.map((status) => getUserStatusLabel(status));

    expect(labels).toEqual([
      "Активный",
      "Заблокирован",
      "Ожидает подтверждения",
      "Требуется верификация",
      "Деактивирован",
    ]);
  });

  it("возвращает корректные цвета для статусов", () => {
    const colors = STATUSES.map((status) => getUserStatusChipColor(status));

    expect(colors).toEqual(["success", "error", "warning", "warning", "error"]);
  });

  it("вычисляет приоритеты сортировки", () => {
    const priorities = STATUSES.map((status) => getUserStatusPriority(status));

    expect(priorities).toEqual([0, 3, 1, 2, 4]);
  });

  it("определяет активный статус", () => {
    const results = STATUSES.map((status) => isActiveUserStatus(status));

    expect(results).toEqual([true, false, false, false, false]);
  });
});
