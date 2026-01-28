import { propertyTitle } from "@/shared/utils/propertyTitle";
import {
  ListingType,
  Property,
  PropertyStatus,
} from "@/shared/interfaces/Property";
import { describe, expect, it } from "vitest";

describe("propertyTitle", () => {
  const createProperty = (): Property => ({
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
    },
    property_photos: [],
    characteristics: [],
    property_owners: [],
    created_at: "",
    updated_at: "",
  });

  it("возвращает заглушку заголовка", () => {
    const property = createProperty();
    const result = propertyTitle(property);

    expect(result).toBe(" 2-комн. / 76,5м² / этаж 3 из 44");
  });
});
