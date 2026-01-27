import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdPhoto } from "react-icons/md";

import {
  ListingTypeText,
  Property,
  PropertyStatusText,
} from "@/shared/interfaces/Property";
import {
  htmlToShortText,
  propertyAddress,
  propertyTitle,
} from "@/shared/utils";
import { PropertyPriceInfo } from "@/shared/components/PropertyPriceInfo";
import { AgentCompactCard } from "@/shared/components/AgentCompactCard";
import { Button } from "@/shared/components/ui/button";

// TODO: перевести компонент в shared/components так как используется в нескольких модулях.
// TODO: убрать description из карточки

/**
 * Свойства карточки элемента списка объектов недвижимости.
 */
interface PropertiesListItemProps {
  /** Объект недвижимости */
  property: Property;

  /** Отображение кнопок действий в карточке */
  showActionButton?: boolean;
}

/**
 * Компонент карточки объекта недвижимости в списке.
 * Показывает превью (или заглушку, если фото нет), базовую информацию,
 * адрес, описание, карточку агента и кнопки действий.
 *
 * Если у объекта нет фото, отображается заглушка с иконкой из `react-icons`.
 * Превью и заглушка кликабельны и ведут на страницу деталей объекта.
 */
export const PropertiesListItem = ({
  property,
  showActionButton,
}: PropertiesListItemProps) => {
  const navigate = useNavigate();
  const shortDescription = React.useMemo(
    () => htmlToShortText(property.description, 300, "..."),
    [property.description],
  );

  const handleOpenDetails = React.useCallback(() => {
    navigate("/properties/" + property.slug);
  }, [navigate, property.slug]);

  const previewUrl =
    property.property_photos?.[0]?.file_preview_url ??
    property.property_photos?.[0]?.file_url ??
    "";

  return (
    <div className="grid gap-4 rounded-lg border border-grey-300 bg-white p-4 lg:grid-cols-[1fr_2fr]">
      <div className="flex flex-col gap-2">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Фото недвижимости"
            className="w-full cursor-pointer rounded-lg"
            onClick={handleOpenDetails}
          />
        ) : (
          <button
            type="button"
            aria-label="Открыть страницу объекта недвижимости"
            onClick={handleOpenDetails}
            className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-grey-300 bg-grey-100 text-grey-500"
          >
            <MdPhoto size={64} />
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          <div>
            <h5 className="text-h5 text-foreground">{property.title}</h5>
            <p className="text-subtitle1 text-labels-secondary">
              {propertyTitle(property)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-body2 text-labels-secondary">
            <span>{PropertyStatusText[property.status]}</span>
            <span>{ListingTypeText[property.listing_type]}</span>
            <span>{property.price}</span>
          </div>

          <div className="space-y-2">
            {property.property_location && (
              <p className="text-body1 text-grey-600">
                {propertyAddress(property).fullAddress}
              </p>
            )}
            {shortDescription && (
              <p className="text-body1 text-grey-600">{shortDescription}</p>
            )}
          </div>

          {property.agent && (
            <div className="py-2">
              <AgentCompactCard agent={property.agent} />
            </div>
          )}

          {showActionButton && (
            <div className="grid gap-3 sm:grid-cols-[1.25fr_1fr]">
              <Button asChild variant="secondary" size="lg">
                <Link to={`/requests/buy?property=${property.id}`}>
                  Открыть заявки
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to={`/properties/${property.slug}`}>Открыть детали</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="hidden items-start justify-end sm:flex">
          <PropertyPriceInfo property={property} />
        </div>
      </div>
    </div>
  );
};
