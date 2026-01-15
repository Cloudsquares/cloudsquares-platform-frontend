import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { devLogger } from "@/shared/utils";
import { BasicTextField } from "@/shared/components/BasicTextField";
import { PropertyCategoriesSelectField } from "@/shared/components/PropertyCategoriesSelectField";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { PropertyCategory } from "@/shared/interfaces/PropertyCategory";
import { usePropertyCategoryFormStore } from "./store/usePropertyCategoryFormStore";
import {
  createPropertyCategoriesDataFormSchema,
  PropertyCategoriesDataFormData,
} from "./validations";
import {
  useCreatePropertyCategoryMutation,
  useUpdatePropertyCategoryMutation,
} from "./hooks";
import { PropertyCategoriesDeleteForm } from "./components";
import { useDeletePropertyCategoryMutation } from "./hooks/useDeletePropertyCategoryMutation";
import { Button } from "@/shared/components/ui/button";

interface PropertyCategoryFormModuleProps {
  mode: BasicDrawerMode;
  editablePropertyCategory?: PropertyCategory | null;
  onSubmit?: () => void;
  onDecline?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const PropertyCategoryFormModule = ({
  mode,
  editablePropertyCategory = null,
  onSuccess,
  onDecline,
  onError,
}: PropertyCategoryFormModuleProps) => {
  const canCreateNewPropertyCategory = useCanAccess(
    "createNewPropertyCategory",
  );
  const canUpdatePropertyCategory = useCanAccess("updatePropertyCategory");
  const initialState = usePropertyCategoryFormStore(
    (state) => state.initialState,
  );

  const setInitialState = () => {
    if (mode !== BasicDrawerMode.create && editablePropertyCategory) {
      return {
        title: editablePropertyCategory.title,
        parent_id: editablePropertyCategory.parent_id || "",
      };
    }
    return initialState;
  };

  const methods = useForm<PropertyCategoriesDataFormData>({
    resolver: zodResolver(createPropertyCategoriesDataFormSchema(mode)),
    defaultValues: setInitialState(),
  });

  const { handleSubmit, reset } = methods;
  const createPropertyCategoryMutation = useCreatePropertyCategoryMutation({
    onSuccess: () => {
      onSuccess?.();
      reset();
    },
  });
  const updatePropertyCategoryMutation = useUpdatePropertyCategoryMutation({
    onSuccess: () => {
      onSuccess?.();
      reset();
    },
  });
  const deletePropertyCategoryMutation = useDeletePropertyCategoryMutation({
    onSuccess: () => {
      onSuccess?.();
      reset();
    },
  });
  const disableInput =
    createPropertyCategoryMutation.isPending ||
    updatePropertyCategoryMutation.isPending ||
    deletePropertyCategoryMutation.isPending;

  const onSubmitForm = (data: PropertyCategoriesDataFormData) => {
    switch (mode) {
      case BasicDrawerMode.create:
        if (!canCreateNewPropertyCategory) {
          toast.error("Нет доступа на создание новой категории недвижимости", {
            duration: 5000,
          });
          return;
        }
        return createPropertyCategoryMutation.mutate(data);
      case BasicDrawerMode.edit:
        if (!canUpdatePropertyCategory) {
          toast.error("Нет доступа на обновление категории недвижимости", {
            duration: 5000,
          });
          return;
        }

        if (!editablePropertyCategory) {
          toast.error("Категория недвижимости не определена", {
            duration: 5000,
          });
          devLogger.error("editablePropertyCategory is null");
          return;
        }

        return updatePropertyCategoryMutation.mutate({
          id: editablePropertyCategory.id,
          data,
        });
      case BasicDrawerMode.delete:
        if (!editablePropertyCategory) {
          toast.error("Категория недвижимости не определена", {
            duration: 5000,
          });
          devLogger.error("editablePropertyCategory is null");
          return;
        }
        return deletePropertyCategoryMutation.mutate({
          id: editablePropertyCategory.id,
        });
      default:
        toast.error("Ошибка формы", { duration: 5000 });
        devLogger.error("PropertyCategoryFormModule: unexpected form mode", {
          mode,
        });
        onError?.();
        return;
    }
  };

  const handleResetForm = () => {
    reset();
    if (onDecline) onDecline();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitForm, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        className="flex h-full flex-col gap-4 p-4"
      >
        {mode === BasicDrawerMode.delete ? (
          <PropertyCategoriesDeleteForm
            editablePropertyCategory={editablePropertyCategory}
          />
        ) : (
          <div className="flex-1 space-y-4">
            <BasicTextField<PropertyCategoriesDataFormData>
              name="title"
              label="Название"
              placeholder="Введите название категории"
              disabled={disableInput}
            />
            <PropertyCategoriesSelectField<PropertyCategoriesDataFormData>
              isOptional
              name="parent_id"
              placeholder="Выберите родительскую категорию"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleResetForm}
            disabled={disableInput}
          >
            Отменить
          </Button>
          <Button type="submit" size="lg" disabled={disableInput}>
            {mode === BasicDrawerMode.delete ? "Удалить" : "Сохранить"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
