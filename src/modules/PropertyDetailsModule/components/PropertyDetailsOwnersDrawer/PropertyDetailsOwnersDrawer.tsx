import { usePropertyDetailsStore } from "@/modules/PropertyDetailsModule/store";
import { usePropertyOwnerDrawersStore } from "@/modules/PropertyOwnerDrawerModule/store";
import { BasicDrawer } from "@/shared/components/BasicDrawer";
import { PropertyOwnerCard } from "@/shared/components/PropertyOwnerCard";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { Alert, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: 1 }}>
        <Box flexGrow={1}>
          {showPropertyOwners && (
            <Box
              display="grid"
              gap={1.5}
              sx={{
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
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
            </Box>
          )}

          {!showPropertyOwners && (
            <Alert severity="info">
              Собственники для данного объекта недвижимости не указаны
            </Alert>
          )}
        </Box>
        <Box pt={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              setShowOwnersDrawer(false);
              navigate(
                `/properties/${currentProperty?.id}/update?step=property_owners`,
              );
            }}
          >
            Добавить собственника
          </Button>
        </Box>
      </Box>
    </BasicDrawer>
  );
};
