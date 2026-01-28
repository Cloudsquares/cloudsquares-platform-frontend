import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { UsersListItem } from "../UsersListItem";
import { CountryCode, User, UserStatus } from "@/shared/interfaces";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { UserRole } from "@/shared/permissions/roles";
import { useUsersStore } from "../../../store";

vi.mock("@/shared/permissions/canAccess", () => ({
  useCanAccess: vi.fn(),
}));

vi.mock("../../../store", () => ({
  useUsersStore: vi.fn(),
}));

describe("UsersListItem", () => {
  const openDrawerWithMode = vi.fn();
  const setEditableUser = vi.fn();

  type UserOverrides = Omit<
    Partial<User>,
    "user_status" | "role" | "country_code"
  > & {
    user_status?: Partial<User["user_status"]>;
    role?: UserRole;
    country_code?: CountryCode;
  };

  const buildUser = (overrides: UserOverrides = {}): User => {
    const defaultStatus: User["user_status"] = {
      status: UserStatus.active,
      description: null,
      changed_at: null,
      changed_by_id: null,
    };

    const { user_status: statusOverrides, ...rest } = overrides;

    return {
      id: "user-1",
      phone: "77000000001",
      first_name: "Alex",
      last_name: "Smith",
      middle_name: null,
      role: UserRole.agent,
      country_code: CountryCode.KZ,
      user_status: {
        ...defaultStatus,
        ...(statusOverrides ?? {}),
      },
      email: "alex@example.com",
      agency: null,
      created_at: "2025-01-01T00:00:00.000Z",
      updated_at: "2025-01-01T00:00:00.000Z",
      ...rest,
    };
  };

  beforeEach(() => {
    vi.mocked(useCanAccess).mockReturnValue(false);

    type UsersStoreState = Parameters<typeof useUsersStore>[0] extends (
      state: infer State,
    ) => unknown
      ? State
      : never;

    const storeState: UsersStoreState = {
      showUserFormDrawer: false,
      setShowUserFormDrawer: vi.fn(),
      mode: BasicDrawerMode.create,
      setMode: vi.fn(),
      openDrawerWithMode,
      editableUser: null,
      setEditableUser,
    };

    vi.mocked(useUsersStore).mockImplementation((selector) =>
      selector(storeState),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("показывает статус и причину блокировки", () => {
    const user = buildUser({
      user_status: {
        status: UserStatus.banned,
        description: "Нарушение правил",
      },
    });

    render(<UsersListItem user={user} />);

    expect(screen.getByText("Smith Alex")).toBeInTheDocument();
    expect(screen.getByText("Заблокирован")).toBeInTheDocument();
    expect(screen.getByText("Причина: Нарушение правил")).toBeInTheDocument();
    expect(screen.queryByText(/Деактивирован:/i)).not.toBeInTheDocument();
  });

  it("показывает информацию о деактивации", () => {
    const user = buildUser({
      user_status: {
        status: UserStatus.deactivated,
        changed_at: "2025-01-01T10:00:00.000Z",
      },
    });

    render(<UsersListItem user={user} />);

    expect(screen.getByText("Деактивирован")).toBeInTheDocument();
    expect(screen.getByText(/Деактивирован:/i)).toBeInTheDocument();
  });
});
