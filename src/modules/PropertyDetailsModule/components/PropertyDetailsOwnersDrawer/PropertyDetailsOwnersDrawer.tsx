import { usePropertyDetailsStore } from "@/modules/PropertyDetailsModule/store";
import { usePropertyOwnerDrawersStore } from "@/modules/PropertyOwnerDrawerModule/store";
import { BasicDrawer } from "@/shared/components/BasicDrawer";
import { PropertyOwnerCard } from "@/shared/components/PropertyOwnerCard";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

export const PropertyDetailsOwnersDrawer = () => {
  const showOwnersDrawer = usePropertyDetailsStore(
    (state) => state.showOwnersDrawer,
  );
  const setShowOwnersDrawer = usePropertyDetailsStore(
    (state) => state.setShowOwnersDrawer,
  );
  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );
  const openPropertyOwnerDrawerWithMode = usePropertyOwnerDrawersStore(
    (state) => state.openPropertyOwnerDrawerWithMode,
  );

  const showPropertyOwners =
    (currentProperty?.property_owners?.length ?? 0) > 0;

  const navigate = useNavigate();

  return (
    <BasicDrawer
      title="Собственники"
      isOpen={showOwnersDrawer}
      setIsOpen={setShowOwnersDrawer}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1">
          {showPropertyOwners && (
            <div className="grid gap-4 md:grid-cols-2">
              {currentProperty?.property_owners?.map((owner) => (
                <PropertyOwnerCard
                  key={owner.id}
                  owner={owner}
                  onDelete={() =>
                    openPropertyOwnerDrawerWithMode(
                      BasicDrawerMode.delete,
                      owner,
                      currentProperty.id,
                    )
                  }
                  onEdit={() =>
                    openPropertyOwnerDrawerWithMode(
                      BasicDrawerMode.edit,
                      owner,
                      currentProperty.id,
                    )
                  }
                />
              ))}
            </div>
          )}

          {!showPropertyOwners && (
            <Alert variant="info">
              <AlertDescription>
                Собственники для данного объекта недвижимости не указаны
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="pt-2">
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={() => {
              setShowOwnersDrawer(false);
              navigate(
                `/properties/${currentProperty?.id}/update?step=property_owners`,
              );
            }}
          >
            Добавить собственника
          </Button>
        </div>
      </div>
    </BasicDrawer>
  );
};
