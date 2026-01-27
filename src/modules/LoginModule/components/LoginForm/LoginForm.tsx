import React from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginFormDataTypes,
  LoginFormValidationSchema,
} from "../../validations";
import { useLoginMutation } from "../../hooks";
import { useRegistrationStore } from "../../../RegistrationModule/store/useRegistrationStore";
import { BasicTextField } from "../../../../shared/components/BasicTextField";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

/**
 * Форма входа в систему.
 *
 * - Использует `react-hook-form` для управления вводом.
 * - Выполняет запрос авторизации через `apiLoginModule.postLogin()`.
 * - Управляет токеном через Zustand-хранилище `useLoginStore`.
 * - Показывает уведомления с `react-hot-toast`.
 *
 * @returns React-компонент формы входа
 */
export const LoginForm = () => {
  const [showSessionEndAlert, setShowSessionEndAlert] =
    React.useState<boolean>(false);
  const [params] = useSearchParams();
  const session_end = params.get("session_end");

  React.useEffect(() => {
    if (session_end && session_end === "true") {
      setShowSessionEndAlert(true);
    } else {
      setShowSessionEndAlert(false);
    }
  }, [session_end]);

  const setShowRegistrationDrawer = useRegistrationStore(
    (state) => state.setShowRegistrationDrawer,
  );

  const methods = useForm<LoginFormDataTypes>({
    resolver: zodResolver(LoginFormValidationSchema),
    defaultValues: { phone: "", password: "" },
  });

  const { handleSubmit } = methods;
  const loginMutation = useLoginMutation();

  /**
   * Обрабатывает отправку формы входа.
   *
   * @param {LoginFormDataTypes} data Данные формы (логин и пароль).
   */
  const handleFormSubmit = (data: LoginFormDataTypes) => {
    const normalizedData: LoginFormDataTypes = {
      ...data,
      phone: data.phone.slice(1), // Удаляем +
    };
    loginMutation.mutate(normalizedData);
  };

  return (
    <FormProvider {...methods}>
      {showSessionEndAlert && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Ваша сессия истекла, пожалуйста, войдите снова.
          </AlertDescription>
        </Alert>
      )}
      <div className="rounded-lg border border-border bg-card">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4 px-6 py-6 md:px-10"
        >
          <h1 className="text-h4 text-foreground">Добро пожаловать!</h1>

          <BasicTextField<LoginFormDataTypes>
            name="phone"
            label="Телефон"
            placeholder="Введите телефон"
            inputName="username"
            autoComplete="username"
            disabled={loginMutation.isPending}
          />
          <BasicTextField<LoginFormDataTypes>
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            inputName="current-password"
            autoComplete="current-password"
            disabled={loginMutation.isPending}
          />
          <button
            type="button"
            className="text-left text-body2 text-foreground underline"
            onClick={() =>
              toast.error(
                "Пожалуйста, обратитесь в тех. поддержку, мы восстановим Ваш пароль!",
              )
            }
          >
            Забыли пароль?
          </button>
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
              ) : (
                "Войти в систему"
              )}
            </Button>
            <p className="text-center text-body2 text-labels-secondary">или</p>
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={loginMutation.isPending}
              onClick={() => setShowRegistrationDrawer(true)}
            >
              Создать аккаунт
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
