import { propertyAddress } from "@/shared/utils/propertyAddress";
import {
  ListingType,
  Property,
  PropertyStatus,
} from "@/shared/interfaces/Property";
import { describe, expect, it } from "vitest";

const createProperty = (
  overrides: Partial<Property["property_location"]>,
): Property => ({
  id: "1",
  title: "Test",
  slug: "test",
  status: PropertyStatus.pending,
  description: "desc",
  discount: 0,
  is_active: true,
  listing_type: ListingType.sale,
  price: 1,
  agency: {} as Property["agency"],
  agent: {} as Property["agent"],
  category: {} as Property["category"],
  property_location: {
    country: "Kazakhstan",
    region: "Almaty",
    city: "Алматы",
    street: "ул. Абая",
    house_number: "10",
    map_link: null,
    is_info_hidden: false,
    geo_city_id: null,
    ...overrides,
  },
  property_photos: [],
  characteristics: [],
  property_owners: [],
  created_at: "",
  updated_at: "",
});

describe("propertyAddress", () => {
  it("собирает короткий и полный адрес", () => {
    const property = createProperty({});
    expect(propertyAddress(property)).toEqual({
      shortAddress: "Алматы, ул. Абая, 10",
      fullAddress: "Алматы, ул. Абая, 10",
    });
  });

  it("включает null, если отсутствует номер дома", () => {
    const property = createProperty({ house_number: null });
    expect(propertyAddress(property)).toEqual({
      shortAddress: "Алматы, ул. Абая, ",
      fullAddress: "Алматы, ул. Абая, ",
    });
  });
});
