import React from "react";
import { PropertyDetailsInfoList } from "../PropertyDetailsInfoList";
import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsInfoItem } from "../../../../shared/interfaces/PropertyDetails";

export const PropertyDetailsAdditionalOptions = () => {
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
    <React.Fragment>
      <div className="space-y-2">
        <h5 className="text-h5 text-foreground">
          Дополнительные характеристики
        </h5>
        <PropertyDetailsInfoList data={displayData()} />
      </div>
      <div className="space-y-2 md:pt-12">
        <PropertyDetailsInfoList data={displayData()} />
      </div>
    </React.Fragment>
  );
};
