import { useDeactivatePropertyOwnerMutation } from "@/modules/PropertyOwnerDrawerModule/hooks";
import {
  DisplayTextPropertyOwnerRole,
  PropertyOwner,
} from "@/shared/interfaces/PropertyOwner";
import { devLogger, displayUserName } from "@/shared/utils";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";

interface DeletePropertyOwnerFormData {
  property_id: string;
  owner_id: string;
}

interface PropertyOwnerDrawerDeleteFormProps {
  property_id: string;
  editablePropertyOwner: PropertyOwner;
  onSubmit?: () => void;
  onDecline?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const PropertyOwnerDrawerDeleteForm = ({
  editablePropertyOwner,
  property_id,
  onSuccess,
  onDecline,
  onError,
}: PropertyOwnerDrawerDeleteFormProps) => {
  const methods = useForm<DeletePropertyOwnerFormData>({
    defaultValues: {
      property_id,
      owner_id: editablePropertyOwner.id,
    },
  });

  const { handleSubmit, reset } = methods;
  const deletePropertyOwnerMutation = useDeactivatePropertyOwnerMutation();
  const disableInput = deletePropertyOwnerMutation.isPending;

  const onSubmit = (data: DeletePropertyOwnerFormData) => {
    deletePropertyOwnerMutation.mutate({
      property_id: data.property_id,
      owner_id: data.owner_id,
      onError,
      onSuccess,
    });
  };

  const handleResetForm = () => {
    reset();
    if (onDecline) onDecline();
  };

  const { first_name, middle_name, last_name } = editablePropertyOwner;
  const fullName = displayUserName({
    first_name,
    middle_name,
    last_name,
  }).fullName;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        className="flex h-full flex-col gap-4"
      >
        <div className="flex-1">
          <p className="text-body1 text-foreground">
            Вы уверены, что хотите удалить собственника{" "}
            <strong>
              {fullName} (
              {DisplayTextPropertyOwnerRole[editablePropertyOwner.role]})
            </strong>
            ?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
            disabled={disableInput}
          >
            Отмена
          </Button>
          <Button type="submit" variant="destructive" disabled={disableInput}>
            Удалить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
