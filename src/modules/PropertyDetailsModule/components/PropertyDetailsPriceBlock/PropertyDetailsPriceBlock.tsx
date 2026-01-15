import { Box, Button, Grid, Typography } from "@mui/material";
import { IoMdDocument } from "react-icons/io";
import { MdDelete, MdEdit, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { PropertyOwnerDrawerModule } from "@/modules/PropertyOwnerDrawerModule";
import { AgentCompactCard } from "@/shared/components/AgentCompactCard";
import { DiscountLabel } from "@/shared/components/DiscountLabel";
import { calculatePricePerMeter, propertyAddress } from "@/shared/utils";
import { usePropertyDetailsStore } from "../../store";
import { PropertyDetailsOwnersDrawer } from "../PropertyDetailsOwnersDrawer";

// TODO: При клике на "Данные владельца" открыть модалку с карточками всех владельцев и кнопку "Редактировать",
// при клике на кнопку открывать страницу редактирования с параметром ?step=property_owners
export const PropertyDetailsPriceBlock = () => {
  const navigate = useNavigate();
  const setShowDeactivateDrawer = usePropertyDetailsStore(
    (state) => state.setShowDeactivateDrawer,
  );
  const setShowOwnersDrawer = usePropertyDetailsStore(
    (state) => state.setShowOwnersDrawer,
  );

  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  if (currentProperty)
    return (
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography
              component="p"
              variant="body4"
              color="customColors.grey500"
            >
              {calculatePricePerMeter(currentProperty.price, 42)}₽ за м²
            </Typography>
            <DiscountLabel
              price={currentProperty.price}
              discount={currentProperty.discount}
            />
            <Typography component="h5" variant="h5" mb={1}>
              {(
                currentProperty.price - currentProperty.discount
              ).toLocaleString("ru")}
              ₽
            </Typography>
            <Typography component="p" variant="subtitle2">
              42,5м². 2-комн. квартира
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color={currentProperty.property_location ? "inherit" : "error"}
            >
              {currentProperty.property_location
                ? propertyAddress(currentProperty).fullAddress
                : "Адрес не указан"}
            </Typography>
          </Box>
          <Box py={2}>
            <AgentCompactCard agent={currentProperty.agent} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<MdEdit />}
              onClick={() =>
                navigate(
                  `/properties/${currentProperty.id}/update?step=basic_data`,
                )
              }
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MdPerson />}
              onClick={() => setShowOwnersDrawer(true)}
            >
              Данные собственников
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<IoMdDocument />}
            >
              Заявки на покупку
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<MdDelete />}
              onClick={() => setShowDeactivateDrawer(true)}
            >
              Удалить
            </Button>
          </Box>
        </Box>
        <PropertyDetailsOwnersDrawer />
        <PropertyOwnerDrawerModule />
      </Grid>
    );

  return null;
};
