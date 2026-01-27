import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { devLogger } from "@/shared/utils";
import { Property } from "@/shared/interfaces/Property";
import { PropertiesListItem } from "@/modules/PropertiesModule/components/PropertiesListItem";

import { usePropertyDetailsStore } from "../../store";
import { useDeactivatePropertyMutation } from "../../hooks";
import { Button } from "@/shared/components/ui/button";

interface PropertyDetailsDeleteFormProps {
  property: Property;
}

interface DeletePropertyFormData {
  property_id: string;
}

export const PropertyDetailsDeleteForm = ({
  property,
}: PropertyDetailsDeleteFormProps) => {
  const navigate = useNavigate();
  const setShowDeactivateDrawer = usePropertyDetailsStore(
    (state) => state.setShowDeactivateDrawer,
  );

  const methods = useForm<DeletePropertyFormData>({
    defaultValues: { property_id: property.id },
  });

  const deactivatePropertyMutation = useDeactivatePropertyMutation();

  const { handleSubmit } = methods;

  const onSubmit = ({ property_id }: DeletePropertyFormData) => {
    if (property_id) {
      deactivatePropertyMutation.mutate({
        property_id: property.id,
        agency_id: property.agency.id,
        onSuccess: () => {
          setShowDeactivateDrawer(false);
          navigate("/properties");
        },
      });
    } else {
      toast.error("Объект недвижимости не определен!");
    }
  };

  const handleResetForm = () => {
    setShowDeactivateDrawer(false);
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
            Вы уверены, что хотите деактивировать объект недвижимости{" "}
            <strong className="text-error">{property.title}</strong>?
          </p>
          <div className="space-y-2">
            <p className="text-body1 text-foreground">
              Деактивация объекта недвижимости приведет к последствиям:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-body2 text-labels-secondary">
              <li>
                объект недвижимости не будет отображаться в каталоге, будет
                перемещен в "Архив";
              </li>
              <li>
                клиенты не смогут оставить заявки на покупку этой недвижимости;
              </li>
            </ul>
          </div>
          <PropertiesListItem property={property} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
            disabled={deactivatePropertyMutation.isPending}
          >
            Закрыть
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={deactivatePropertyMutation.isPending}
          >
            Деактивировать
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
