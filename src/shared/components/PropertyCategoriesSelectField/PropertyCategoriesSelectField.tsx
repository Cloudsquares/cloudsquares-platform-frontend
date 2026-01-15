import { useGetAllPropertyCategoriesQuery } from "@/shared/hooks/propertyCategories";
import { PropertyCategory } from "@/shared/interfaces/PropertyCategory";
import { useUserProfile } from "@/shared/permissions/hooks";
import React from "react";
import { FieldValues, Path } from "react-hook-form";

import { AxiosErrorAlertMessage } from "../AxiosErrorAlertMessage";
import { BasicFormSelectField } from "../BasicFormSelectField";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface PropertyCategoriesSelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  isOptional?: boolean;
  placeholder?: string;
  buttonToAddNewCategory?: {
    buttonLabel: string;
    onButtonClick: () => void;
  };
}

// TODO: айди агентства брать не из профиля пользователя, а из ???
export const PropertyCategoriesSelectField = <
  TFieldValues extends FieldValues,
>({
  name,
  isOptional = false,
  buttonToAddNewCategory = undefined,
  placeholder = "Выберите категорию",
}: PropertyCategoriesSelectFieldProps<TFieldValues>) => {
  const userProfile = useUserProfile();

  const {
    data: propertyCategoriesData,
    isLoading: propertyCategoriesIsLoading,
    isError: propertyCategoriesIsError,
    error: propertyCategoriesError,
  } = useGetAllPropertyCategoriesQuery(userProfile?.agency?.id);

  const selectData = (categories: PropertyCategory[]) => {
    const options = [];
    const categoryOptions = categories.map((category) => ({
      value: category.id,
      label: category.title,
    }));

    if (isOptional) {
      options.push({ value: "", label: "Без категории" });
    }

    return [...options, ...categoryOptions];
  };

  return (
    <React.Fragment>
      {propertyCategoriesIsError && propertyCategoriesError && (
        <AxiosErrorAlertMessage error={propertyCategoriesError} />
      )}
      {!propertyCategoriesData && propertyCategoriesIsLoading && (
        <Skeleton className="h-11 w-full" />
      )}
      {propertyCategoriesData && (
        <BasicFormSelectField<TFieldValues>
          name={name}
          placeholder={placeholder}
          buttonOptions={
            buttonToAddNewCategory
              ? {
                  buttonLabel: buttonToAddNewCategory.buttonLabel,
                  onButtonClick: buttonToAddNewCategory.onButtonClick,
                }
              : undefined
          }
          data={selectData(propertyCategoriesData)}
        />
      )}
    </React.Fragment>
  );
};
