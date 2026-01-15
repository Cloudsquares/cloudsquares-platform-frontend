import { useDeactivateUserByIdMutation } from "@/modules/UsersModule/hooks";
import { BasicTextField } from "@/shared/components/BasicTextField";
import { User } from "@/shared/interfaces";
import { devLogger, displayUserName } from "@/shared/utils";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UsersDeleteFormProps {
  user: User;
  onSubmit?: () => void;
  onDecline?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

interface DeleteUserFormData {
  user_name: string;
}

export const UsersDeleteForm = ({
  user,
  onDecline,
  onSuccess,
}: UsersDeleteFormProps) => {
  const { first_name, last_name, middle_name } = user;
  const displayName = displayUserName({ first_name, last_name, middle_name });
  const methods = useForm<DeleteUserFormData>({
    defaultValues: { user_name: "" },
  });

  const { handleSubmit, reset, watch } = methods;

  const deactivateUserByIdMutation = useDeactivateUserByIdMutation();

  const onSubmit = (data: DeleteUserFormData) => {
    if (
      data.user_name &&
      data.user_name.trim() === displayName.fullName.trim()
    ) {
      deactivateUserByIdMutation.mutate({ id: user.id, onSuccess: onSuccess });
    } else {
      toast.error("Введите ФИО сотрудника для подтверждения удаления!");
    }
  };

  const handleResetForm = () => {
    reset();
    if (onDecline) onDecline();
  };

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
          <Box pb={2}>
            <Typography component="p" variant="body1">
              Вы уверены, что хотите удалить сотрудника{" "}
              <Box component="strong" color="customColors.error">
                {displayName.fullName}
              </Box>
              ?
            </Typography>
          </Box>
          <Box pb={2}>
            <Typography component="p" variant="body1">
              Удаление сотрудника приведет к необратимым последствиям:
            </Typography>
            <List>
              <ListItem dense>
                <ListItemText>
                  - сотрудник утратит доступ к системе;
                </ListItemText>
              </ListItem>
              <ListItem dense>
                <ListItemText>
                  - все данные, где задействован сотрудник, останутся без
                  изменений;
                </ListItemText>
              </ListItem>
              <ListItem dense>
                <ListItemText>
                  - объекты недвижимости, где был задействован сотрудник,
                  необходимо вручную отредактировать и назначить нового
                  ответственного сотрудника;
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box>
            <Typography component="p" variant="body2">
              Для подтверждения, введите ниже{" "}
              <Box component="strong">{displayName.fullName}</Box>
            </Typography>
            <Box pt={2}>
              <BasicTextField
                name="user_name"
                label="Подтверждение удаления сотрудника"
                placeholder="Введите ФИО сотрудника"
                disabled={deactivateUserByIdMutation.isPending}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetForm}
            disabled={deactivateUserByIdMutation.isPending}
          >
            Закрыть
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={
              deactivateUserByIdMutation.isPending ||
              watch("user_name") !== displayName.fullName
            }
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
