import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TestProviders } from "@/providers";
import { usePropertyDetailsStore } from "@/modules/PropertyDetailsModule/store";
import { PropertyDetailsOwnersDrawer } from "@/modules/PropertyDetailsModule/components/PropertyDetailsOwnersDrawer";
import {
  PropertyOwner,
  PropertyOwnerRole,
} from "@/shared/interfaces/PropertyOwner";
import {
  ListingType,
  Property,
  PropertyStatus,
} from "@/shared/interfaces/Property";

const buildOwner = (overrides: Partial<PropertyOwner> = {}): PropertyOwner => ({
  id: "owner-1",
  first_name: "Ivan",
  last_name: "Petrov",
  middle_name: "Ivanovich",
  phone: "77000000000",
  email: "ivan@example.com",
  notes: "",
  role: PropertyOwnerRole.primary,
  contact_id: "contact-1",
  person_id: "person-1",
  property_id: "property-1",
  is_deleted: false,
  deleted_at: null,
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
  ...overrides,
});

const buildProperty = (owners: PropertyOwner[]): Property => ({
  id: "property-1",
  title: "Test Property",
  slug: "test-property",
  status: PropertyStatus.active,
  description: "Test description",
  discount: 0,
  is_active: true,
  listing_type: ListingType.sale,
  price: 100000,
  agency: {
    id: "agency-1",
    title: "Agency",
    slug: "agency",
    custom_domain: null,
  },
  agent: {
    id: "agent-1",
    phone: "77000000001",
    first_name: "Agent",
    last_name: "Smith",
    middle_name: null,
  },
  category: {
    id: "category-1",
    slug: "category",
    title: "Category",
    parent_id: null,
    level: 1,
    position: 1,
    is_active: true,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
  },
  property_location: {
    country: "RU",
    region: "",
    city: "",
    street: "",
    house_number: null,
    map_link: null,
    is_info_hidden: false,
    geo_city_id: null,
  },
  property_photos: [],
  characteristics: [],
  property_owners: owners,
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
});

describe("PropertyDetailsOwnersDrawer", () => {
  const renderComponent = () =>
    render(
      <TestProviders>
        <PropertyDetailsOwnersDrawer />
      </TestProviders>,
    );

  beforeEach(() => {
    vi.useFakeTimers();
    usePropertyDetailsStore.setState({
      showOwnersDrawer: true,
      currentProperty: null,
    });
  });

  afterEach(() => {
    usePropertyDetailsStore.setState({
      showOwnersDrawer: false,
      currentProperty: null,
    });
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("фильтрует список собственников по поиску", async () => {
    const owners = [
      buildOwner({
        id: "owner-1",
        first_name: "Ivan",
        last_name: "Petrov",
        middle_name: null,
      }),
      buildOwner({
        id: "owner-2",
        first_name: "Olga",
        last_name: "Sidorova",
        middle_name: null,
        email: "olga@example.com",
      }),
    ];

    usePropertyDetailsStore.setState({
      showOwnersDrawer: true,
      currentProperty: buildProperty(owners),
    });

    renderComponent();

    const input = screen.getByPlaceholderText("Поиск по собственникам");
    fireEvent.change(input, { target: { value: "Ivan" } });
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(screen.getByText(/Petrov Ivan/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sidorova Olga/i)).not.toBeInTheDocument();
  });

  it("показывает сообщение, если поиск не дал результатов", async () => {
    const owners = [
      buildOwner({
        first_name: "Ivan",
        last_name: "Petrov",
        middle_name: null,
      }),
    ];

    usePropertyDetailsStore.setState({
      showOwnersDrawer: true,
      currentProperty: buildProperty(owners),
    });

    renderComponent();

    const input = screen.getByPlaceholderText("Поиск по собственникам");
    fireEvent.change(input, { target: { value: "Missing" } });
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(
      screen.getByText("По заданному поиску ничего не найдено."),
    ).toBeInTheDocument();
  });
});
