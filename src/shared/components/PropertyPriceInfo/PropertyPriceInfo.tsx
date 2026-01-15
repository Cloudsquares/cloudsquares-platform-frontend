import { Property } from "@/shared/interfaces/Property";
import { calculatePricePerMeter } from "@/shared/utils";

import { DiscountLabel } from "../DiscountLabel";

interface PropertyPriceInfoProps {
  property: Property;
}

// TODO: Проверить, точно ли нужен этот компонент в shared?
export const PropertyPriceInfo = ({ property }: PropertyPriceInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <DiscountLabel price={property.price} discount={property.discount} />
      <p className="text-h4 text-foreground">
        {(property.price - property.discount).toLocaleString("ru")} ₽
      </p>
      <p className="text-body1 text-labels-secondary">
        {calculatePricePerMeter(property.price, 42)} ₽ за м²
      </p>
    </div>
  );
};
