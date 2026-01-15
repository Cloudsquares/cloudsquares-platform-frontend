import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetPropertyDetailsQuery } from "@/shared/hooks/propertyDetails";
import { BasicPageHeader } from "@/shared/components/Mobile/BasicPageHeader";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";

import { PropertyDetailsPriceBlock } from "./components/PropertyDetailsPriceBlock";
import { PropertyDetailsPhotoBlock } from "./components/PropertyDetailsPhotoBlock";
import { PropertyDetailsSlimInfo } from "./components/PropertyDetailsSlimInfo";
import { PropertyDetailsApartmentInfo } from "./components/PropertyDetailsApartmentInfo";
import { usePropertyDetailsStore } from "./store";
import { PropertyDetailsApartmentHouseInfo } from "./components/PropertyDetailsApartmentHouseInfo";
import { PropertyDetailsAdditionalOptions } from "./components/PropertyDetailsAdditionalOptions";
import { PropertyDetailsDescriptionInfo } from "./components/PropertyDetailsDescriptionInfo";
import { PropertyDetailsDeactivateDrawer } from "./components/PropertyDetailsDeactivateDrawer";

/**
 * Модуль страницы деталей недвижимости.
 *
 * Поведение:
 * - При смене `id` из URL сбрасывает `currentProperty` в Zustand → предотвращает
 *   «мигание» старыми данными (старые фото) до прихода новых.
 * - После успешной загрузки кладёт актуальные данные в `currentProperty`.
 * - В блок фото передаёт `key` и `entityKey`, чтобы Embla пересоздавалась при смене объекта.
 */
export const PropertyDetailsModule = () => {
  const { id: idOrSlug } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );
  const setCurrentProperty = usePropertyDetailsStore(
    (state) => state.setCurrentProperty,
  );

  const { data, isSuccess, isLoading, error } =
    useGetPropertyDetailsQuery(idOrSlug);

  React.useEffect(() => {
    if (isSuccess && data && idOrSlug && idOrSlug !== data.slug) {
      navigate(`/properties/${data.slug}`, { replace: true });
    }
  }, [isSuccess, data, idOrSlug, navigate]);

  React.useEffect(() => {
    setCurrentProperty(null);
  }, [idOrSlug, setCurrentProperty]);

  React.useEffect(() => {
    if (isSuccess && data) {
      setCurrentProperty(data);
    }
  }, [data, isSuccess, setCurrentProperty]);

  const showContent = Boolean(currentProperty) && !isLoading;

  return (
    <React.Fragment>
      <BasicPageHeader title="Детали недвижимости" shownBackArrowButton />
      <div className="mx-auto w-full max-w-screen-xl px-4 pb-24 pt-4 md:pb-0 md:pt-0">
        {error && !isLoading && (
          <div className="w-full md:w-1/2 lg:w-1/3">
            <AxiosErrorAlertMessage error={error} />
          </div>
        )}

        {isLoading && <div className="text-body2">loading..</div>}

        {showContent && (
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <PropertyDetailsPhotoBlock
                key={idOrSlug}
                entityKey={idOrSlug}
                photos={currentProperty!.property_photos ?? []}
              />
              <div className="space-y-4">
                <PropertyDetailsSlimInfo />
                <h1 className="text-h4 text-foreground">
                  {currentProperty!.title}
                </h1>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <PropertyDetailsApartmentInfo />
                <PropertyDetailsApartmentHouseInfo />
                <PropertyDetailsAdditionalOptions />
                <div className="md:col-span-2">
                  <PropertyDetailsDescriptionInfo />
                </div>
              </div>
            </div>

            <PropertyDetailsPriceBlock />
          </div>
        )}
      </div>
      <PropertyDetailsDeactivateDrawer />
    </React.Fragment>
  );
};
