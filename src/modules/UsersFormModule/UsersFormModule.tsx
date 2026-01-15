import React from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { devLogger } from "../../shared/utils";
import { BasicDrawerMode } from "../../shared/interfaces/Shared";
import { BasicTextField } from "../../shared/components/BasicTextField";
import { PasswordRulesHint } from "../../shared/components/PasswordRulesHint";
import {
  countrySelectOptions,
  userRoleSelectOptions,
} from "../../shared/constants";
import { BasicFormSelectField } from "../../shared/components/BasicFormSelectField";

import {
  UsersFormData,
  createUsersFormSchema,
} from "./validations/usersFormValidationsSchema";
import { useUsersFormStore } from "./store";
import { useCreateNewUserMutation, usePatchUserMutation } from "./hooks";
import { User } from "../../shared/interfaces";
import { normalizeEditableUserData } from "./utils";
import { useCanAccess } from "../../shared/permissions/canAccess";
import { Button } from "@/shared/components/ui/button";

interface UsersFormModuleProps {
  mode: BasicDrawerMode;
  editableUser: User | null;
  onSubmit?: () => void;
  onDecline?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}
// TODO: добавить проверки кто может создавать/редактировать пользователей
export const UsersFormModule = ({
  editableUser,
  mode,
  onSubmit,
  onDecline,
  onError,
  onSuccess,
}: UsersFormModuleProps) => {
  const initialState = useUsersFormStore((state) => state.initialState);
  const canEditUserPassword = useCanAccess("canEditUserPassword");

  const methods = useForm<UsersFormData>({
    resolver: zodResolver(createUsersFormSchema(mode)),
    defaultValues:
      editableUser && mode === BasicDrawerMode.edit
        ? normalizeEditableUserData(editableUser)
        : initialState,
  });

  const { handleSubmit, reset, watch, formState } = methods;
  const password = watch("password");
  const passwordStarted = formState.dirtyFields.password;

  const patchUserMutation = usePatchUserMutation({ onSuccess, onError });
  const postNewUserMutation = useCreateNewUserMutation({ onSuccess, onError });
  const disableInput =
    postNewUserMutation.isPending || patchUserMutation.isPending;

  const onSubmitForm = (data: UsersFormData) => {
    if (onSubmit) onSubmit();

    const normalizedData: UsersFormData = {
      ...data,
      phone: data.phone.slice(1), // Удаляем +
    };

    if (mode === BasicDrawerMode.edit && !normalizedData.password) {
      delete normalizedData.password;
      delete normalizedData.password_confirmation;
    }

    switch (mode) {
      case BasicDrawerMode.create:
        return postNewUserMutation.mutate(normalizedData);
      case BasicDrawerMode.edit:
        if (editableUser)
          return patchUserMutation.mutate({
            data: normalizedData,
            id: editableUser?.id,
          });
        return toast.error("Пользователь не определен", { duration: 5000 });
      default:
        toast.error("Ошибка формы");
    }
  };

  const handleResetForm = () => {
    if (onDecline) onDecline();
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitForm, (errors) =>
          devLogger.error("Ошибки валидации:", errors),
        )}
        className="flex h-full flex-col gap-4 p-4"
      >
        <div className="flex-1 space-y-4">
          <BasicTextField<UsersFormData>
            name="first_name"
            label="Имя"
            placeholder="Введите имя сотрудника"
            disabled={disableInput}
          />
          <BasicTextField<UsersFormData>
            name="last_name"
            label="Фамилия"
            placeholder="Введите фамилию сотрудника"
            disabled={disableInput}
          />
          <BasicTextField<UsersFormData>
            name="middle_name"
            label="Отчество"
            placeholder="Введите отчество сотрудника"
            disabled={disableInput}
          />
          <BasicTextField<UsersFormData>
            name="email"
            label="Почта"
            placeholder="Введите почту сотрудника"
            disabled={disableInput}
          />
          <BasicTextField<UsersFormData>
            name="phone"
            label="Телефон"
            placeholder="+7 705 123 45 67"
            disabled={disableInput}
          />
          {canEditUserPassword && (
            <React.Fragment>
              <div>
                <BasicTextField<UsersFormData>
                  name="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  type="password"
                  inputName="new-password"
                  autoComplete="new-password"
                  disabled={disableInput}
                />
                <PasswordRulesHint
                  password={password || ""}
                  touched={!!passwordStarted}
                />
              </div>
              <BasicTextField<UsersFormData>
                name="password_confirmation"
                label="Повторите пароль"
                placeholder="Введите пароль повторно"
                type="password"
                inputName="new-password"
                autoComplete="new-password"
                disabled={disableInput}
              />
            </React.Fragment>
          )}
          <BasicFormSelectField
            name="country_code"
            label="Страна:"
            placeholder="Выберите страну"
            data={countrySelectOptions()}
            disabled={disableInput}
          />
          <BasicFormSelectField
            name="role"
            label="Роль:"
            placeholder="Выберите роль"
            data={userRoleSelectOptions()}
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
            Закрыть
          </Button>
          <Button type="submit" size="lg" disabled={disableInput}>
            Сохранить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
