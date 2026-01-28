import { TestProviders } from "@/providers";
import {
  ListingType,
  Property,
  PropertyStatus,
} from "@/shared/interfaces/Property";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PropertyPriceInfo } from "../PropertyPriceInfo";

const createProperty = (overrides?: Partial<Property>): Property => ({
  id: "1",
  title: "Test property",
  slug: "test-property",
  status: PropertyStatus.active,
  description: "Description",
  discount: 100000,
  is_active: true,
  listing_type: ListingType.sale,
  price: 1000000,
  agency: {} as Property["agency"],
  agent: {} as Property["agent"],
  category: {} as Property["category"],
  property_location: {
    country: "KZ",
    region: "Almaty",
    city: "Алматы",
    street: "Абая",
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
  ...overrides,
});

describe("PropertyPriceInfo", () => {
  it("показывает скидку, цену со скидкой и стоимость за квадрат", () => {
    const property = createProperty();

    render(
      <TestProviders>
        <PropertyPriceInfo property={property} />
      </TestProviders>,
    );

    expect(
      screen.getByText((content) => content.includes("-10.00")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("900 000") && content.includes("₽"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("23 810") && content.includes("₽ за м²"),
      ),
    ).toBeInTheDocument();
  });
});
