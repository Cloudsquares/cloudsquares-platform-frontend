import { IoMdDocument } from "react-icons/io";
import { MdDelete, MdEdit, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { PropertyOwnerDrawerModule } from "@/modules/PropertyOwnerDrawerModule";
import { AgentCompactCard } from "@/shared/components/AgentCompactCard";
import { DiscountLabel } from "@/shared/components/DiscountLabel";
import { calculatePricePerMeter, propertyAddress } from "@/shared/utils";
import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsOwnersDrawer } from "../PropertyDetailsOwnersDrawer";
import { Button } from "@/shared/components/ui/button";

// TODO: При клике на "Данные владельца" открыть модалку с карточками всех владельцев и кнопку "Редактировать",
// при клике на кнопку открывать страницу редактирования с параметром ?step=property_owners
export const PropertyDetailsPriceBlock = () => {
  const navigate = useNavigate();
  const setShowDeactivateDrawer = usePropertyDetailsStore(
    (state) => state.setShowDeactivateDrawer,
  );
  const setShowOwnersDrawer = usePropertyDetailsStore(
    (state) => state.setShowOwnersDrawer,
  );

  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  if (currentProperty)
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-body4 text-grey-500">
            {calculatePricePerMeter(currentProperty.price, 42)}₽ за м²
          </p>
          <DiscountLabel
            price={currentProperty.price}
            discount={currentProperty.discount}
          />
          <h5 className="text-h5 text-foreground">
            {(currentProperty.price - currentProperty.discount).toLocaleString(
              "ru",
            )}
            ₽
          </h5>
          <p className="text-subtitle2 text-foreground">
            42,5м². 2-комн. квартира
          </p>
          <p
            className={
              currentProperty.property_location
                ? "text-body1 text-foreground"
                : "text-body1 text-error"
            }
          >
            {currentProperty.property_location
              ? propertyAddress(currentProperty).fullAddress
              : "Адрес не указан"}
          </p>
        </div>
        <div className="py-2">
          <AgentCompactCard agent={currentProperty.agent} />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={() =>
              navigate(
                `/properties/${currentProperty.id}/update?step=basic_data`,
              )
            }
          >
            <span className="inline-flex items-center gap-2">
              <MdEdit />
              Редактировать
            </span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => setShowOwnersDrawer(true)}
          >
            <span className="inline-flex items-center gap-2">
              <MdPerson />
              Данные собственников
            </span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <span className="inline-flex items-center gap-2">
              <IoMdDocument />
              Заявки на покупку
            </span>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={() => setShowDeactivateDrawer(true)}
          >
            <span className="inline-flex items-center gap-2">
              <MdDelete />
              Удалить
            </span>
          </Button>
        </div>
        <PropertyDetailsOwnersDrawer />
        <PropertyOwnerDrawerModule />
      </div>
    );

  return null;
};
