import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from "vitest";

import { PropertyCategoriesList } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesList";
import type { PropertyCategory } from "@/shared/interfaces/PropertyCategory";
import { CountryCode } from "@/shared/interfaces/Country";
import { User, UserStatus } from "@/shared/interfaces/User";
import { useGetAllPropertyCategoriesQuery } from "@/shared/hooks/propertyCategories";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { useUserProfile } from "@/shared/permissions/hooks";
import { UserRole } from "@/shared/permissions/roles";

vi.mock("@/shared/hooks/propertyCategories", () => ({
  useGetAllPropertyCategoriesQuery: vi.fn(),
}));

vi.mock("@/shared/permissions/canAccess", () => ({
  useCanAccess: vi.fn(),
}));

vi.mock("@/shared/permissions/hooks", () => ({
  useUserProfile: vi.fn(),
}));

const mockedUseGetAllPropertyCategoriesQuery =
  useGetAllPropertyCategoriesQuery as MockedFunction<
    typeof useGetAllPropertyCategoriesQuery
  >;
const mockedUseCanAccess = useCanAccess as MockedFunction<typeof useCanAccess>;
const mockedUseUserProfile = useUserProfile as MockedFunction<
  typeof useUserProfile
>;

const buildUser = (overrides: Partial<User> = {}): User => ({
  id: "user-1",
  phone: "77000000000",
  first_name: "Ivan",
  last_name: null,
  middle_name: null,
  role: UserRole.agent,
  country_code: CountryCode.RU,
  user_status: {
    status: UserStatus.active,
    description: null,
    changed_at: null,
    changed_by_id: null,
  },
  email: "user@example.com",
  agency: {
    id: "agency-1",
    title: "Agency",
    slug: "agency",
    custom_domain: null,
  },
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
  ...overrides,
});

const buildCategory = (
  overrides: Partial<PropertyCategory> = {},
): PropertyCategory => ({
  id: "category-1",
  slug: "category-1",
  title: "Дом",
  parent_id: null,
  level: 0,
  position: 1,
  is_active: true,
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
  ...overrides,
});

const renderComponent = (initialEntries: string[] = ["/categories"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <PropertyCategoriesList />
    </MemoryRouter>,
  );

describe("PropertyCategories", () => {
  beforeEach(() => {
    mockedUseCanAccess.mockReturnValue(false);
    mockedUseUserProfile.mockReturnValue(buildUser());
  });

  it("показывает пустое состояние при поиске без результатов", () => {
    mockedUseGetAllPropertyCategoriesQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useGetAllPropertyCategoriesQuery>);

    renderComponent(["/categories?q=Дом"]);

    expect(
      screen.getByText("По заданному поиску ничего не найдено."),
    ).toBeInTheDocument();
  });

  it("рендерит список категорий", () => {
    mockedUseGetAllPropertyCategoriesQuery.mockReturnValue({
      data: [buildCategory({ title: "Квартира" })],
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useGetAllPropertyCategoriesQuery>);

    renderComponent();

    expect(screen.getByText("Квартира")).toBeInTheDocument();
  });
});
