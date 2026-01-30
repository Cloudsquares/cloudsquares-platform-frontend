import React from "react";

import { PropertyOwnersTable } from "@/modules/PropertyOwnersModule/components/PropertyOwnersTable";
import { usePropertyOwnersSearchParams } from "@/modules/PropertyOwnersModule/hooks";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";
import { Alert, AlertDescription } from "@/shared/components/ui";
import { BasicPageHeader } from "@/shared/components/Mobile/BasicPageHeader";

export const PropertyOwnersModule = () => {
  const { propertyId } = usePropertyOwnersSearchParams();

  return (
    <React.Fragment>
      <BasicPageHeader title="База собственников" shownBackArrowButton />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <div className="hidden md:block">
            <h1 className="text-h1 text-foreground">База собственников</h1>
          </div>
          {propertyId && (
            <SearchInputWrapper
              placeholder="Поиск по собственникам"
              className="w-full max-w-md"
            />
          )}
          {!propertyId && (
            <Alert variant="info">
              <AlertDescription>
                Укажите объект недвижимости, чтобы просмотреть собственников.
              </AlertDescription>
            </Alert>
          )}
          {propertyId && <PropertyOwnersTable propertyId={propertyId} />}
        </div>
      </div>
    </React.Fragment>
  );
};
