import React from "react";

import { PropertiesListItem } from "@/modules/PropertiesModule/components/PropertiesListItem";
import { useGetAllPropertiesOfAgencyQuery } from "@/modules/PropertiesModule/hooks";
import { PropertiesCreateCard } from "@/modules/PropertiesModule/components/PropertiesCreateCard";
import { PropertiesListSkeleton } from "@/modules/PropertiesModule/components/PropertiesListSkeleton";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { Pagination } from "@/shared/components/Pagination";
import { usePagination } from "@/shared/hooks";
import { useUserProfile } from "@/shared/permissions/hooks";

export const PropertiesList = () => {
  const profile = useUserProfile();
  const { page, rowsPerPage, setPage, setRowsPerPage } = usePagination({
    defaultRowsPerPage: 10,
    rowsPerPageKey: "propertiesCatalogRowsPerPage",
  });
  const {
    data: propertiesResponse,
    isLoading: propertiesIsLoading,
    isFetching: propertiesIsFetching,
    isSuccess: propertiesIsSuccess,
    error: propertiesError,
  } = useGetAllPropertiesOfAgencyQuery(profile?.agency?.id, {
    page: page + 1,
    per_page: rowsPerPage,
  });

  const properties = propertiesResponse?.data ?? [];
  const total = propertiesResponse?.total ?? 0;
  const isPageLoading = propertiesIsLoading || propertiesIsFetching;

  if (propertiesError)
    return (
      <div className="w-full md:w-1/2 lg:w-1/3">
        <AxiosErrorAlertMessage error={propertiesError} />
      </div>
    );

  if (!isPageLoading && propertiesIsSuccess && properties.length === 0)
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
      {isPageLoading && <PropertiesListSkeleton count={rowsPerPage} />}
      {!isPageLoading && propertiesIsSuccess && (
        <div className="space-y-4">
          <div className="space-y-4">
            {properties.map((property) => (
              <PropertiesListItem
                key={property.id}
                property={property}
                showActionButton
              />
            ))}
          </div>
          {!propertiesError && (
            <Pagination
              page={page}
              rowsPerPage={rowsPerPage}
              total={total}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};
