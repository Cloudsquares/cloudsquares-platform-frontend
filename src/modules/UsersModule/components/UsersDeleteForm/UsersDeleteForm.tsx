import { useDeactivateUserByIdMutation } from "@/modules/UsersModule/hooks";
import { BasicTextField } from "@/shared/components/BasicTextField";
import { User } from "@/shared/interfaces";
import { devLogger, displayUserName } from "@/shared/utils";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";

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
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        className="flex h-full flex-col gap-4 p-4"
      >
        <div className="flex-1 space-y-4">
          <p className="text-body1 text-foreground">
            Вы уверены, что хотите удалить сотрудника{" "}
            <strong className="text-error">{displayName.fullName}</strong>?
          </p>
          <div className="space-y-2">
            <p className="text-body1 text-foreground">
              Удаление сотрудника приведет к необратимым последствиям:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-body2 text-labels-secondary">
              <li>сотрудник утратит доступ к системе;</li>
              <li>
                все данные, где задействован сотрудник, останутся без изменений;
              </li>
              <li>
                объекты недвижимости, где был задействован сотрудник, необходимо
                вручную отредактировать и назначить нового ответственного
                сотрудника;
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-body2 text-foreground">
              Для подтверждения, введите ниже{" "}
              <strong>{displayName.fullName}</strong>
            </p>
            <BasicTextField
              name="user_name"
              label="Подтверждение удаления сотрудника"
              placeholder="Введите ФИО сотрудника"
              disabled={deactivateUserByIdMutation.isPending}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
            disabled={deactivateUserByIdMutation.isPending}
          >
            Закрыть
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={
              deactivateUserByIdMutation.isPending ||
              watch("user_name") !== displayName.fullName
            }
          >
            Удалить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
