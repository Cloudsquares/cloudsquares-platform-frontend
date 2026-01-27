import { ListingTypeText } from "../../../../shared/interfaces/Property";
import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsInfoItem } from "../../../../shared/interfaces/PropertyDetails";

export const PropertyDetailsSlimInfo = () => {
  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  const displayedData = (): PropertyDetailsInfoItem[] => {
    if (currentProperty)
      return [
        { label: "Город", value: currentProperty?.property_location?.city },
        {
          label: "Услуга",
          value: ListingTypeText[currentProperty.listing_type],
        },
        { label: "Категория", value: currentProperty.category.title },
        { label: "Комнат", value: 2 },
        { label: "Площадь", value: 42.5 },
        { label: "Кухня", value: 5 },
        { label: "Этаж", value: "3/9" },
        { label: "Год постройки", value: 2010 },
      ];

    return [];
  };
  return (
    <div className="grid grid-cols-3 gap-y-4 rounded-md border border-grey-200 px-4 py-3 md:grid-cols-8">
      {displayedData().map(({ label, value }, index) => (
        <div key={index}>
          <p className="text-body3 text-grey-500">{label}</p>
          <p className="text-body2 text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
};
