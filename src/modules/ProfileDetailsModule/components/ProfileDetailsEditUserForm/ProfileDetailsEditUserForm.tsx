import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfileDetailsStore } from "../../store/useProfileDetailsStore";
import {
  UserProfileFormData,
  userProfileFormValidationSchema,
} from "../../validations";
import { useUserProfile } from "../../../../shared/permissions/hooks";
import { devLogger } from "../../../../shared/utils";
import { BasicTextField } from "../../../../shared/components/BasicTextField";
import { usePatchUserProfileMutation } from "../../hooks";
import { CountryCodeDisplayFlag } from "../../../../shared/interfaces/Country";
import { Button } from "@/shared/components/ui/button";

export const ProfileDetailsEditUserForm = () => {
  const profile = useUserProfile();
  const { setShowEditProfileDrawer } = useProfileDetailsStore();

  const methods = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileFormValidationSchema),
    defaultValues: {
      phone: "+" + profile?.phone,
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      middle_name: profile?.middle_name || "",
      email: profile?.email,
    },
  });

  const { handleSubmit, reset } = methods;

  const patchUserProfileMutation = usePatchUserProfileMutation();

  const onSubmit = (data: UserProfileFormData) => {
    if (profile) {
      const clearData = { ...data, phone: data.phone.slice(1) };
      patchUserProfileMutation.mutate({ id: profile?.id, data: clearData });
    } else {
      toast.error("Профиль не найден!");
    }

    setShowEditProfileDrawer(false);
  };

  const handleResetForm = () => {
    reset();
    setShowEditProfileDrawer(false);
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
          <div className="relative">
            <div
              className="absolute inset-0 z-10"
              onClick={() =>
                toast.error(
                  "Изменить сотовый номер Вы можете через запрос в тех. поддержку",
                )
              }
            />
            <BasicTextField<UserProfileFormData>
              name="phone"
              label="Телефон"
              placeholder="+7 705 123 45 67"
              disabled
            />
          </div>
          <BasicTextField<UserProfileFormData>
            name="first_name"
            label="Имя"
            placeholder="Введите имя"
            disabled={patchUserProfileMutation.isPending}
          />
          <BasicTextField<UserProfileFormData>
            name="last_name"
            label="Фамилия"
            placeholder="Введите фамилию"
            disabled={patchUserProfileMutation.isPending}
          />
          <BasicTextField<UserProfileFormData>
            name="middle_name"
            label="Отчество"
            placeholder="Введите отчество"
            disabled={patchUserProfileMutation.isPending}
          />
          <BasicTextField<UserProfileFormData>
            name="email"
            label="E-mail"
            placeholder="Введите почту"
            disabled={patchUserProfileMutation.isPending}
          />
          {profile && (
            <button
              type="button"
              className="w-fit text-body2 text-labels-secondary"
              onClick={() =>
                toast.error(
                  "Изменить страну Вы можете через запрос в тех. поддержку",
                )
              }
            >
              Страна: {CountryCodeDisplayFlag[profile.country_code]}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
            disabled={patchUserProfileMutation.isPending}
          >
            Закрыть
          </Button>
          <Button type="submit" disabled={patchUserProfileMutation.isPending}>
            Сохранить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
