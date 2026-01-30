import { PropertyCategoriesCreateButton } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesCreateButton";
import { PropertyCategoriesListItem } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesListItem";
import { PropertyCategoriesListSkeleton } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesListSkeleton";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { Alert, AlertDescription } from "@/shared/components/ui";
import { useSearchQueryParam } from "@/shared/hooks";
import { useGetAllPropertyCategoriesQuery } from "@/shared/hooks/propertyCategories";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { useUserProfile } from "@/shared/permissions/hooks";

// TODO: айди агентства брать не из профиля пользователя, а из ???
export const PropertyCategoriesList = () => {
  const { query } = useSearchQueryParam();
  const canCreateNewPropertyCategory = useCanAccess(
    "createNewPropertyCategory",
  );
  const userProfile = useUserProfile();
  const {
    data: propertyCategoriesData,
    isLoading: propertyCategoriesIsLoading,
    isError: propertyCategoriesIsError,
    error: propertyCategoriesError,
  } = useGetAllPropertyCategoriesQuery(
    userProfile?.agency?.id,
    query || undefined,
  );

  const hasSearchQuery = query.trim().length > 0;
  const hasResults = (propertyCategoriesData?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-4">
      {propertyCategoriesIsError && propertyCategoriesError && (
        <AxiosErrorAlertMessage error={propertyCategoriesError} />
      )}
      {!propertyCategoriesData && propertyCategoriesIsLoading && (
        <PropertyCategoriesListSkeleton />
      )}
      {propertyCategoriesData?.map((category) => (
        <PropertyCategoriesListItem category={category} key={category.id} />
      ))}
      {propertyCategoriesData && !hasResults && hasSearchQuery && (
        <Alert variant="info">
          <AlertDescription>
            По заданному поиску ничего не найдено.
          </AlertDescription>
        </Alert>
      )}
      {canCreateNewPropertyCategory && <PropertyCategoriesCreateButton />}
    </div>
  );
};
