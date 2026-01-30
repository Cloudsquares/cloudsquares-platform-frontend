import React from "react";
import { useNavigate } from "react-router-dom";

import { usePropertyDetailsStore } from "@/modules/PropertyDetailsModule/store";
import { usePropertyOwnerDrawersStore } from "@/modules/PropertyOwnerDrawerModule/store";
import { BasicDrawer } from "@/shared/components/BasicDrawer";
import { PropertyOwnerCard } from "@/shared/components/PropertyOwnerCard";
import { usePropertyOwnersSearch } from "@/modules/PropertyDetailsModule/hooks";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";
import { Alert, AlertDescription, Button } from "@/shared/components/ui";
import type { PropertyOwner } from "@/shared/interfaces/PropertyOwner";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";

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

  const owners = currentProperty?.property_owners ?? [];
  const showPropertyOwners = owners.length > 0;
  const currentPropertyId = currentProperty?.id ?? null;
  const { searchQuery, setSearchQuery, filteredOwners, hasSearchQuery } =
    usePropertyOwnersSearch(owners);

  const navigate = useNavigate();

  const handleEditOwner = React.useCallback(
    (owner: PropertyOwner) => {
      if (!currentPropertyId) return;

      openPropertyOwnerDrawerWithMode(
        BasicDrawerMode.edit,
        owner,
        currentPropertyId,
      );
    },
    [currentPropertyId, openPropertyOwnerDrawerWithMode],
  );

  const handleDeleteOwner = React.useCallback(
    (owner: PropertyOwner) => {
      if (!currentPropertyId) return;

      openPropertyOwnerDrawerWithMode(
        BasicDrawerMode.delete,
        owner,
        currentPropertyId,
      );
    },
    [currentPropertyId, openPropertyOwnerDrawerWithMode],
  );

  const handleAddOwner = React.useCallback(() => {
    if (!currentPropertyId) return;

    setShowOwnersDrawer(false);
    navigate(`/properties/${currentPropertyId}/update?step=property_owners`);
  }, [currentPropertyId, navigate, setShowOwnersDrawer]);

  return (
    <BasicDrawer
      title="Собственники"
      isOpen={showOwnersDrawer}
      setIsOpen={setShowOwnersDrawer}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1 space-y-4">
          {showPropertyOwners && (
            <SearchInputWrapper
              placeholder="Поиск по собственникам"
              className="w-full max-w-md"
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />
          )}
          {showPropertyOwners && (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredOwners.map((owner) => (
                <PropertyOwnerCard
                  key={owner.id}
                  owner={owner}
                  onDelete={() => handleDeleteOwner(owner)}
                  onEdit={() => handleEditOwner(owner)}
                />
              ))}
            </div>
          )}

          {showPropertyOwners &&
            filteredOwners.length === 0 &&
            hasSearchQuery && (
              <Alert variant="info">
                <AlertDescription>
                  По заданному поиску ничего не найдено.
                </AlertDescription>
              </Alert>
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
            onClick={handleAddOwner}
            disabled={!currentPropertyId}
          >
            Добавить собственника
          </Button>
        </div>
      </div>
    </BasicDrawer>
  );
};
