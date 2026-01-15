import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  AgencyInfoFormData,
  useHomeAgencyInfoEditFormValidationSchema,
} from "../../validations";
import { useHomeStore } from "../../store";
import { usePatchAgencyInfoMutation } from "../../hooks";

import { devLogger } from "../../../../shared/utils";
import { useUserProfile } from "../../../../shared/permissions/hooks";
import { BasicTextField } from "../../../../shared/components/BasicTextField";
import { Button } from "@/shared/components/ui/button";

export const HomeAgencyInfoEditForm = () => {
  const profile = useUserProfile();
  const setShowAgencyInfoDrawer = useHomeStore(
    (state) => state.setShowAgencyInfoDrawer,
  );

  const methods = useForm<AgencyInfoFormData>({
    resolver: zodResolver(useHomeAgencyInfoEditFormValidationSchema),
    defaultValues: {
      title: profile?.agency?.title || "",
    },
  });

  const { handleSubmit, reset } = methods;

  const patchAgencyInfoMutation = usePatchAgencyInfoMutation({
    onSuccess: () => setShowAgencyInfoDrawer(false),
  });

  const onSubmit = (data: AgencyInfoFormData) => {
    if (profile?.agency && data.title) {
      const clearData = { title: data.title };
      patchAgencyInfoMutation.mutate({
        id: profile?.agency?.id,
        data: clearData,
      });
    } else {
      toast.error("Профиль не найден!");
    }
  };

  const handleResetForm = () => {
    reset();
    setShowAgencyInfoDrawer(false);
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
          <BasicTextField<AgencyInfoFormData>
            name="title"
            label="Название"
            placeholder="Введите название агентства"
            disabled={patchAgencyInfoMutation.isPending}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
            disabled={patchAgencyInfoMutation.isPending}
          >
            Закрыть
          </Button>
          <Button type="submit" disabled={patchAgencyInfoMutation.isPending}>
            Сохранить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
