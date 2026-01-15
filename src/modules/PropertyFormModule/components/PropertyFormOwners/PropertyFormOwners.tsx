import { useParams } from "react-router-dom";

import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { PropertyOwnerCard } from "@/shared/components/PropertyOwnerCard";
import { useGetAllPropertyOwnersByPropertyIDQuery } from "@/shared/hooks/propertyOwners";
import { Property } from "@/shared/interfaces/Property";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { PropertyOwnerDrawerModule } from "@/modules/PropertyOwnerDrawerModule";
import { usePropertyOwnerDrawersStore } from "@/modules/PropertyOwnerDrawerModule/store";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { PropertyOwnersForm } from "../PropertyOwnersForm";

interface PropertyFormOwnersProps {
  mode: PropertyFormMode;
  editableProperty?: Property;
}

export const PropertyFormOwners = ({ mode }: PropertyFormOwnersProps) => {
  const { id } = useParams<{ id: string }>();
  const propertyId = id ?? "";
  const openPropertyOwnerDrawerWithMode = usePropertyOwnerDrawersStore(
    (state) => state.openPropertyOwnerDrawerWithMode,
  );

  const { data, isLoading, error } =
    useGetAllPropertyOwnersByPropertyIDQuery(propertyId);
  const owners = data?.data ?? [];
  const isEditMode = mode === PropertyFormMode.edit;

  return (
    <div className="grid gap-4">
      <div className="space-y-4">
        {isEditMode && (
          <h4 className="text-h4 text-foreground">
            Собственники {owners.length ? `(${owners.length})` : ""}
          </h4>
        )}

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[150px]" />
            <Skeleton className="h-[150px]" />
            <Skeleton className="h-[150px]" />
            <Skeleton className="h-[150px]" />
          </div>
        )}

        {error && <AxiosErrorAlertMessage error={error} />}

        {isEditMode && !isLoading && !error && owners.length === 0 && (
          <Alert variant="info">
            <AlertDescription>
              Собственников пока нет, Вы можете добавить их при помощи формы
              ниже
            </AlertDescription>
          </Alert>
        )}

        {owners.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {owners.map((owner) => (
              <PropertyOwnerCard
                key={owner.id}
                owner={owner}
                onDelete={() =>
                  openPropertyOwnerDrawerWithMode(
                    BasicDrawerMode.delete,
                    owner,
                    propertyId,
                  )
                }
                onEdit={() =>
                  openPropertyOwnerDrawerWithMode(
                    BasicDrawerMode.edit,
                    owner,
                    propertyId,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
      {!id && isEditMode ? (
        <Alert variant="destructive">
          <AlertDescription>ID недвижимости не определен!</AlertDescription>
        </Alert>
      ) : (
        <PropertyOwnersForm
          mode={PropertyFormMode.create}
          property_id={id}
          onSuccess={() => {}}
        />
      )}
      <PropertyOwnerDrawerModule />
    </div>
  );
};
