import { AgencySlim } from "./Agency";
import { PropertyCategory } from "./PropertyCategory";
import { PropertyOwner } from "./PropertyOwner";
import { UserSlim } from "./User";

export enum ListingType {
  sale = "sale",
  rent = "rent",
}

export enum ListingTypeText {
  sale = "Продажа",
  rent = "Аренда",
}

export enum PropertyStatus {
  pending = "pending",
  active = "active",
  sold = "sold",
  rented = "rented",
  cancelled = "cancelled",
}

export enum PropertyStatusText {
  pending = "На проверке",
  active = "Активно",
  sold = "Продано",
  rented = "Сдано в аренду",
  cancelled = "Отменено",
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  status: PropertyStatus;
  description: string;
  discount: number;
  is_active: boolean;
  listing_type: ListingType;
  price: number;
  agency: AgencySlim;
  agent: UserSlim;
  category: PropertyCategory;
  property_location: PropertyLocation;
  property_photos: PropertyPhoto[];
  characteristics: []; // todo: add types
  property_owners: PropertyOwner[];
  created_at: string; // "2025-06-25T20:05:47.427Z";
  updated_at: string; // "2025-06-25T20:05:47.427Z";
}

export interface PropertyLocation {
  country: string;
  region: string;
  city: string;
  street: string;
  house_number: string | null;
  map_link: string | null;
  is_info_hidden: boolean;
  geo_city_id: string | null;
}

export enum PropertyPhotoAccess {
  public = "public",
  private = "private",
}

// TODO: подумать, как в i18n описать
export enum PropertyPhotoAccessText {
  public = "Публичное",
  private = "Приватное",
}

export interface PropertyPhoto {
  id: string;
  is_main: boolean;
  position: number;
  access: PropertyPhotoAccess;
  file_preview_url: string;
  file_retina_url: string;
  file_url: string;
  created_at: string; // "2025-06-25T21:22:28.340Z";
}

export interface AllPropertiesResponseData {
  data: Property[];
  total: number;
  pages: number;
}
