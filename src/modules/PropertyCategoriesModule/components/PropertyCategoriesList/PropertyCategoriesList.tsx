import { useUserProfile } from "@/shared/permissions/hooks";
import { useGetAllPropertyCategoriesQuery } from "@/shared/hooks/propertyCategories";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { PropertyCategoriesListItem } from "../PropertyCategoriesListItem";
import { PropertyCategoriesListSkeleton } from "../PropertyCategoriesListSkeleton";
import { PropertyCategoriesCreateButton } from "../PropertyCategoriesCreateButton";

// TODO: айди агентства брать не из профиля пользователя, а из ???
export const PropertyCategoriesList = () => {
  const canCreateNewPropertyCategory = useCanAccess(
    "createNewPropertyCategory",
  );
  const userProfile = useUserProfile();
  const {
    data: propertyCategoriesData,
    isLoading: propertyCategoriesIsLoading,
    isError: propertyCategoriesIsError,
    error: propertyCategoriesError,
  } = useGetAllPropertyCategoriesQuery(userProfile?.agency?.id);

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

      {canCreateNewPropertyCategory && <PropertyCategoriesCreateButton />}
    </div>
  );
};
