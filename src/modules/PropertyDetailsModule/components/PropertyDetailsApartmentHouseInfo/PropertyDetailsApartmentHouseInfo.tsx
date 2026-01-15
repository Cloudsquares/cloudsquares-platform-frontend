import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsInfoItem } from "../../../../shared/interfaces/PropertyDetails";
import { PropertyDetailsInfoList } from "../PropertyDetailsInfoList";

export const PropertyDetailsApartmentHouseInfo = () => {
  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  const displayData = (): PropertyDetailsInfoItem[] => {
    if (currentProperty) {
      return [
        {
          label: "Год постройки",
          value: 2010,
        },
        { label: "Тип дома", value: "Кирпичный" },
        { label: "Тип перекрытий", value: "Железобетонные" },
        { label: "Подъезды", value: "4" },
        { label: "Отопление", value: "Центральное" },
        { label: "Газ", value: "Центральный" },
        { label: "Парковка", value: "Наземная" },
      ];
    }
    return [];
  };

  return (
    <div className="space-y-2">
      <h5 className="text-h5 text-foreground">О доме</h5>
      <PropertyDetailsInfoList data={displayData()} />
    </div>
  );
};
