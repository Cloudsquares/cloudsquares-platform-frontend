import { PropertyOwnerDrawerDeleteForm } from "@/modules/PropertyOwnerDrawerModule/components/PropertyOwnerDrawerDeleteContent";
import { usePropertyOwnerDrawersStore } from "@/modules/PropertyOwnerDrawerModule/store";
import { BasicDrawer } from "@/shared/components/BasicDrawer";
import {
  BasicDrawerMode,
  DisplayTextBasicDrawerMode,
} from "@/shared/interfaces/Shared";
import { devLogger } from "@/shared/utils";
import { Alert, Box } from "@mui/material";
import React from "react";

export const PropertyOwnerDrawerModule = () => {
  const mode = usePropertyOwnerDrawersStore((state) => state.mode);
  const showPropertyOwnerDrawer = usePropertyOwnerDrawersStore(
    (state) => state.showPropertyOwnerDrawer,
  );
  const editablePropertyOwner = usePropertyOwnerDrawersStore(
    (state) => state.editablePropertyOwner,
  );
  const property_id = usePropertyOwnerDrawersStore(
    (state) => state.property_id,
  );
  const setShowPropertyOwnerDrawer = usePropertyOwnerDrawersStore(
    (state) => state.setShowPropertyOwnerDrawer,
  );

  const isDelete = mode === BasicDrawerMode.delete;

  React.useEffect(() => {
    if (!editablePropertyOwner)
      devLogger.error("Пользователь не определен!", editablePropertyOwner);
  }, [editablePropertyOwner]);

  React.useEffect(() => {
    if (!property_id)
      devLogger.error("Объект недвижимости не определен!", property_id);
  }, [property_id]);

  return (
    <BasicDrawer
      title={DisplayTextBasicDrawerMode[mode] + " собственника"}
      isOpen={showPropertyOwnerDrawer}
      setIsOpen={setShowPropertyOwnerDrawer}
    >
      <Box height={1}>
        {!editablePropertyOwner && (
          <Alert severity="error">Собственник не определен!</Alert>
        )}
        {!property_id && (
          <Alert severity="error">Объект недвижимости не определен!</Alert>
        )}
        {isDelete && editablePropertyOwner && property_id && (
          <PropertyOwnerDrawerDeleteForm
            property_id={property_id}
            editablePropertyOwner={editablePropertyOwner}
            onDecline={() => setShowPropertyOwnerDrawer(false)}
            onSuccess={() => setShowPropertyOwnerDrawer(false)}
          />
        )}
      </Box>
    </BasicDrawer>
  );
};
