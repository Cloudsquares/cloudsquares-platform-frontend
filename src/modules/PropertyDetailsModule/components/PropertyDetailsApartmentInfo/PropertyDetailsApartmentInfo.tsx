import { PropertyDetailsInfoList } from "../PropertyDetailsInfoList";
import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsInfoItem } from "../../../../shared/interfaces/PropertyDetails";
import { ListingTypeText } from "../../../../shared/interfaces/Property";

export const PropertyDetailsApartmentInfo = () => {
  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  const displayData = (): PropertyDetailsInfoItem[] => {
    if (currentProperty) {
      return [
        {
          label: "Тип жилья",
          value: ListingTypeText[currentProperty.listing_type],
        },
        { label: "Общая площадь", value: "42.5 м2" },
        { label: "Жилая площадь", value: "28.5 м2" },
        { label: "Площадь кухни", value: "5 м2" },
        { label: "Сан. узел", value: 1 },
        { label: "Балкон/Лоджия", value: 1 },
        { label: "Отделка", value: "Косметический ремонт" },
      ];
    }
    return [];
  };

  return (
    <div className="space-y-2">
      <h5 className="text-h5 text-foreground">О квартире</h5>
      <PropertyDetailsInfoList data={displayData()} />
    </div>
  );
};
