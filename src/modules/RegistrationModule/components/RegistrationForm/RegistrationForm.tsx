import { Alert, Box, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { usePostNewUserMutation } from "../../hooks";
import { useRegistrationStore } from "../../store/useRegistrationStore";
import {
  RegistrationFormData,
  useRegistrationFormValidationSchema,
} from "../../validations";

import { BasicFormSelectField } from "../../../../shared/components/BasicFormSelectField";
import { countrySelectOptions } from "../../../../shared/constants";
import { CountryCode } from "../../../../shared/interfaces/Country";
import { PasswordRulesHint } from "../../../../shared/components/PasswordRulesHint";
import { BasicTextField } from "../../../../shared/components/BasicTextField";
import { devLogger } from "../../../../shared/utils";

/**
 * Форма регистрации агентского администратора и агентства.
 *
 * Собирает данные, нормализует телефон и отправляет запрос
 * через `usePostNewUserMutation`.
 *
 * @returns JSX-форма регистрации
 */
export const RegistrationForm = () => {
  const setShowRegistrationDrawer = useRegistrationStore(
    (state) => state.setShowRegistrationDrawer,
  );

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(useRegistrationFormValidationSchema),
    defaultValues: {
      country_code: CountryCode.KZ,
      first_name: "",
      agency_title: "",
      phone: "+7",
      email: "",
    },
  });

  const { handleSubmit, reset, watch, formState } = methods;
  const password = watch("password");
  const passwordStarted = formState.dirtyFields.password;

  const postNewUserMutation = usePostNewUserMutation();

  const onSubmit = (data: RegistrationFormData) => {
    const normalizedData: RegistrationFormData = {
      ...data,
      phone: data.phone.slice(1), // Удаляем +
    };
    postNewUserMutation.mutate(normalizedData);
  };

  const handleResetForm = () => {
    reset();
    setShowRegistrationDrawer(false);
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
          <Box sx={{ pb: 2 }}>
            <BasicFormSelectField
              name="country_code"
              label="Страна:"
              placeholder="Выберите страну"
              data={countrySelectOptions()}
              disabled={postNewUserMutation.isPending}
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Ваша страна проживания и/или деятельности. От выбранной страны
              будут зависеть некоторые системные настройки согласно
              законодательству выбранной страны.
            </Alert>
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="phone"
              label="Телефон"
              placeholder="+7 705 123 45 67"
              inputName="tel"
              autoComplete="tel"
              disabled={postNewUserMutation.isPending}
            />
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="first_name"
              label="Ваше имя"
              placeholder="Введите имя"
              inputName="name"
              autoComplete="name"
              disabled={postNewUserMutation.isPending}
            />
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="agency_title"
              label="Название агентства"
              placeholder="Введите название агентства"
              inputName="organization"
              autoComplete="organization"
              disabled={postNewUserMutation.isPending}
            />
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="email"
              label="E-mail"
              placeholder="Введите почту"
              inputName="email"
              autoComplete="email"
              disabled={postNewUserMutation.isPending}
            />
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              inputName="new-password"
              autoComplete="new-password"
              disabled={postNewUserMutation.isPending}
            />
            <PasswordRulesHint
              password={password}
              touched={!!passwordStarted}
            />
          </Box>
          <Box pb={1}>
            <BasicTextField<RegistrationFormData>
              name="password_confirmation"
              label="Повторите пароль"
              placeholder="Введите пароль повторно"
              type="password"
              inputName="new-password"
              autoComplete="new-password"
              disabled={postNewUserMutation.isPending}
            />
          </Box>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetForm}
            disabled={postNewUserMutation.isPending}
          >
            Закрыть
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={postNewUserMutation.isPending}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
