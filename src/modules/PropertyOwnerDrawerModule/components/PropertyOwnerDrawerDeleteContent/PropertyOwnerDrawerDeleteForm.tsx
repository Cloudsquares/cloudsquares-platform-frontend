import { useDeactivatePropertyOwnerMutation } from "@/modules/PropertyOwnerDrawerModule/hooks";
import {
  DisplayTextPropertyOwnerRole,
  PropertyOwner,
} from "@/shared/interfaces/PropertyOwner";
import { devLogger, displayUserName } from "@/shared/utils";
import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

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
    // if (
    //   data.user_name &&
    //   data.user_name.trim() === displayName.fullName.trim()
    // ) {
    //   deactivateUserByIdMutation.mutate({ id: user.id, onSuccess: onSuccess });
    // } else {
    //   toast.error("Введите ФИО сотрудника для подтверждения удаления!");
    // }
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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        sx={{ p: 2, display: "flex", flexDirection: "column", height: 1 }}
      >
        <Box flexGrow={1}>
          <Typography>
            Вы уверены, что хотите удалить собственника{" "}
            <strong>
              {fullName} (
              {DisplayTextPropertyOwnerRole[editablePropertyOwner.role]})
            </strong>
            ?
          </Typography>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetForm}
            disabled={disableInput}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={disableInput}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
