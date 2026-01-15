import React from "react";

import { PropertiesListItem } from "../PropertiesListItem";
import { useGetAllPropertiesOfAgencyQuery } from "../../hooks";
import { useUserProfile } from "../../../../shared/permissions/hooks";
import { AxiosErrorAlertMessage } from "../../../../shared/components/AxiosErrorAlertMessage";
import { PropertiesCreateCard } from "../PropertiesCreateCard";
import { PropertiesListSkeleton } from "../PropertiesListSkeleton";

export const PropertiesList = () => {
  const profile = useUserProfile();
  const {
    data: properties,
    isLoading: propertiesIsLoading,
    isSuccess: propertiesIsSuccess,
    error: propertiesError,
  } = useGetAllPropertiesOfAgencyQuery(profile?.agency?.id);

  if (propertiesError)
    return (
      <div className="w-full md:w-1/2 lg:w-1/3">
        <AxiosErrorAlertMessage error={propertiesError} />
      </div>
    );

  if (propertiesIsSuccess && properties.length === 0)
    return (
      <div className="w-full md:w-1/2 lg:w-1/3">
        <PropertiesCreateCard
          title="Каталог пуст"
          description="Добавьте объекты недвижимости в систему и они появятся здесь"
        />
      </div>
    );

  return (
    <React.Fragment>
      {propertiesIsLoading && <PropertiesListSkeleton />}
      {properties && propertiesIsSuccess && (
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertiesListItem
              key={property.id}
              property={property}
              showActionButton
            />
          ))}
          {!propertiesIsLoading && !propertiesError && (
            <div className="w-full md:w-1/2">
              <PropertiesCreateCard
                title="Новый объект"
                description="Добавьте объекты недвижимости в систему и они появятся здесь"
              />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
