import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TipTapEditorModule } from "@/modules/TipTapEditorModule";
import { PropertyCategoriesSelectField } from "@/shared/components/PropertyCategoriesSelectField";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { Property } from "@/shared/interfaces/Property";
import { devLogger } from "@/shared/utils";
import { BasicTextField } from "@/shared/components/BasicTextField";
import { BasicFormSelectField } from "@/shared/components/BasicFormSelectField";
import { propertyListingTypeSelectOptions } from "@/shared/constants";

import {
  createPropertyBasicDataFormSchema,
  PropertyBasicDataFormData,
} from "../../validations";
import { PropertyFormSteps, usePropertyFormStore } from "../../store";
import {
  useCreatePropertyMutation,
  usePatchPropertyMutation,
} from "../../hooks";
import { normalizePropertyBasicData } from "../../utils";
import { PropertyCategoryDrawer } from "../PropertyCategoryDrawer";
import { Button } from "@/shared/components/ui/button";

interface PropertyBasicDataFormProps {
  mode: PropertyFormMode;
  editableProperty?: Property;
  onSubmit?: () => void;
  onDecline?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const PropertyBasicDataForm = ({
  editableProperty,
  mode,
}: PropertyBasicDataFormProps) => {
  const navigate = useNavigate();
  const setStep = usePropertyFormStore((state) => state.setStep);
  const setShowPropertyCategoryDrawer = usePropertyFormStore(
    (state) => state.setShowPropertyCategoryDrawer,
  );

  const initialState = usePropertyFormStore(
    (state) => state.initialBasicDataState,
  );

  const methods = useForm<PropertyBasicDataFormData>({
    resolver: zodResolver(createPropertyBasicDataFormSchema(mode)),
    defaultValues: editableProperty
      ? normalizePropertyBasicData(editableProperty)
      : initialState,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;
  const createPropertyMutation = useCreatePropertyMutation();
  const patchPropertyMutation = usePatchPropertyMutation();
  const disableInput =
    createPropertyMutation.isPending || patchPropertyMutation.isPending;

  const onSubmitForm = (data: PropertyBasicDataFormData) => {
    switch (mode) {
      case PropertyFormMode.create:
        return createPropertyMutation.mutate({
          data,
        });
      case PropertyFormMode.edit:
        if (!editableProperty?.id) {
          return toast.error("ID объекта не определен!");
        }

        return patchPropertyMutation.mutate({
          id: editableProperty.id,
          data,
          onSuccess: () => {
            const next = new URLSearchParams(location.search);
            next.set("step", "property_owners");
            navigate(
              { pathname: location.pathname, search: next.toString() },
              { replace: false },
            );
          },
        });
      default:
        toast.error("Неизвестный режим формы", { duration: 5000 });
        devLogger.error("PropertyBasicDataForm: unexpected form mode", mode);
        return;
    }
  };

  const handleResetForm = () => {
    setStep(PropertyFormSteps.basic_data);
    navigate("/properties");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitForm, (errors) =>
            devLogger.error("Ошибки валидации:", errors),
          )}
          className="flex h-full flex-col gap-4 py-4"
        >
          <div className="flex-1 space-y-4">
            <h4 className="text-h4 text-foreground">Основные данные</h4>
            <BasicTextField<PropertyBasicDataFormData>
              name="title"
              label="Название"
              placeholder="Введите название объекта"
              disabled={disableInput}
            />
            <BasicTextField<PropertyBasicDataFormData>
              name="price"
              label="Стоимость"
              placeholder="Введите стоимость объекта"
              disabled={disableInput}
              type="number"
              showCurrency
            />
            <BasicTextField<PropertyBasicDataFormData>
              name="discount"
              label="Текущая скидка"
              placeholder="Введите текущую скидку"
              disabled={disableInput}
              type="number"
              showCurrency
            />
            <BasicFormSelectField<PropertyBasicDataFormData>
              name="listing_type"
              placeholder="Выберите тип размещения"
              data={propertyListingTypeSelectOptions()}
            />
            <PropertyCategoriesSelectField<PropertyBasicDataFormData>
              name="category_id"
              buttonToAddNewCategory={{
                buttonLabel: "+ Добавить категорию",
                onButtonClick: () => setShowPropertyCategoryDrawer(true),
              }}
            />
            <TipTapEditorModule<PropertyBasicDataFormData>
              name="description"
              disabled={disableInput}
            />
          </div>
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
              Дальше
            </Button>
          </div>
        </form>
      </FormProvider>
      <PropertyCategoryDrawer />
    </>
  );
};
