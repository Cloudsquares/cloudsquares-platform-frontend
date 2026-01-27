import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  DisplayTextPropertyFormMode,
  PropertyFormMode,
} from "@/shared/interfaces/PropertyForm";
import { devLogger } from "@/shared/utils";
import { BasicTextField } from "@/shared/components/BasicTextField";
import { BasicFormSelectField } from "@/shared/components/BasicFormSelectField";
import { propertyOwnerRoleSelectOptions } from "@/shared/constants";
import { useCreatePropertyOwnerMutation } from "@/shared/hooks/propertyOwners";
import {
  createPropertyOwnersDataFormSchema,
  PropertyOwnersDataFormData,
} from "../../validations";
import { usePropertyFormStore } from "../../store";
import { Button } from "@/shared/components/ui/button";

interface PropertyOwnersFormProps {
  mode: PropertyFormMode;
  property_id?: string;
  onSuccess: () => void;
}

export const PropertyOwnersForm = ({
  mode,
  property_id,
  onSuccess,
}: PropertyOwnersFormProps) => {
  const initialState = usePropertyFormStore(
    (state) => state.initialOwnersDataState,
  );

  const methods = useForm<PropertyOwnersDataFormData>({
    resolver: zodResolver(createPropertyOwnersDataFormSchema(mode)),
    defaultValues: initialState,
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;
  const createPropertyOwnerMutation = useCreatePropertyOwnerMutation();
  const disableInput = createPropertyOwnerMutation.isPending;

  const onSubmitForm = (data: PropertyOwnersDataFormData) => {
    switch (mode) {
      case PropertyFormMode.create:
        if (!property_id)
          return toast.error("ID объекта недвижимости не определен!");

        return createPropertyOwnerMutation.mutate({
          data,
          onSuccess: () => {
            onSuccess();
            reset();
          },
          property_id,
        });

      case PropertyFormMode.edit:
        break;
      default:
        toast.error("Неизвестный режим формы", { duration: 5000 });
        devLogger.error("PropertyOwnersForm: unexpected form mode", mode);
        return;
    }

    if (property_id)
      createPropertyOwnerMutation.mutate({
        data,
        onSuccess: () => {
          onSuccess();
          reset();
        },
        property_id,
      });
  };

  const handleResetForm = () => {
    reset();
    toast.success("Форма успешно очищена!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitForm, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        className="flex h-full flex-col gap-4 py-4"
      >
        <div className="flex-1 space-y-4">
          <h4 className="text-h4 text-foreground">
            {DisplayTextPropertyFormMode[mode]} собственника
          </h4>
          <BasicTextField<PropertyOwnersDataFormData>
            name="first_name"
            label="Имя*"
            placeholder="Введите название объекта"
            disabled={disableInput}
          />
          <BasicTextField<PropertyOwnersDataFormData>
            name="last_name"
            label="Фамилия"
            placeholder="Введите название объекта"
            disabled={disableInput}
          />
          <BasicTextField<PropertyOwnersDataFormData>
            name="middle_name"
            label="Отчество"
            placeholder="Введите название объекта"
            disabled={disableInput}
          />
          <BasicTextField<PropertyOwnersDataFormData>
            name="phone"
            label="Телефон*"
            placeholder="+7 705 123 45 67"
            disabled={disableInput}
          />
          <BasicTextField<PropertyOwnersDataFormData>
            name="email"
            label="E-mail"
            placeholder="Введите почту"
            disabled={disableInput}
          />
          <BasicTextField<PropertyOwnersDataFormData>
            name="notes"
            type="textarea"
            multiline
            minRows={4}
            label="Заметка"
            placeholder="Эту заметку увидят только сотрудники"
            disabled={disableInput}
          />
          <BasicFormSelectField
            name="role"
            placeholder="Роль собственника"
            data={propertyOwnerRoleSelectOptions()}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            disabled={disableInput}
            onClick={handleResetForm}
          >
            Очистить
          </Button>
          <Button type="submit" size="lg" disabled={disableInput}>
            Создать
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
