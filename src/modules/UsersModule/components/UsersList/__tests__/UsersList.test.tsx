import { render, screen } from "@testing-library/react";

import { UsersList } from "../UsersList";
import { useGetAllUsersQuery } from "../../../hooks";
import { CountryCode, User, UserStatus } from "@/shared/interfaces";
import { UserRole } from "@/shared/permissions/roles";

jest.mock("../../../hooks", () => ({
  useGetAllUsersQuery: jest.fn(),
}));

jest.mock("../../UsersListItem", () => ({
  UsersListItem: ({ user }: { user: User }) => (
    <div data-testid="user-item">{user.id}</div>
  ),
}));

describe("UsersList", () => {
  const mockedUseGetAllUsersQuery = useGetAllUsersQuery as jest.MockedFunction<
    typeof useGetAllUsersQuery
  >;

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

  it("сортирует пользователей по приоритету статуса", () => {
    const users = [
      buildUser({
        id: "banned",
        user_status: { status: UserStatus.banned },
        created_at: "2025-01-03T00:00:00.000Z",
      }),
      buildUser({
        id: "active",
        user_status: { status: UserStatus.active },
        created_at: "2025-01-02T00:00:00.000Z",
      }),
      buildUser({
        id: "pending",
        user_status: { status: UserStatus.pending },
        created_at: "2025-01-01T00:00:00.000Z",
      }),
      buildUser({
        id: "deactivated",
        user_status: { status: UserStatus.deactivated },
        created_at: "2025-01-04T00:00:00.000Z",
      }),
    ];

    mockedUseGetAllUsersQuery.mockReturnValue({
      data: users,
      isSuccess: true,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useGetAllUsersQuery>);

    render(<UsersList />);

    const ids = screen
      .getAllByTestId("user-item")
      .map((node) => node.textContent);

    expect(ids).toEqual(["active", "pending", "banned", "deactivated"]);
  });
});
