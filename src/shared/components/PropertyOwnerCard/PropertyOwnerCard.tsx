import {
  DisplayTextPropertyOwnerRole,
  PropertyOwner,
} from "@/shared/interfaces/PropertyOwner";
import { displayUserName } from "@/shared/utils";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";

interface PropertyOwnerCardProps {
  owner: PropertyOwner;
  onEdit?: (owner: PropertyOwner) => void;
  onDelete?: (owner: PropertyOwner) => void;
  showActions?: boolean;
}

// TODO: добавить редактирование/удаление владельца
export const PropertyOwnerCard = ({
  owner,
  onEdit,
  onDelete,
  showActions = true,
}: PropertyOwnerCardProps) => {
  if (owner.is_deleted) return null;

  const { last_name, first_name, middle_name } = owner;
  const fullName =
    displayUserName({ last_name, first_name, middle_name }).fullName ||
    "Без имени";

  const roleLabel =
    DisplayTextPropertyOwnerRole[owner.role] ?? String(owner.role);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.25}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Typography component="h4" variant="subtitle1">
              {fullName}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              {showActions && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  {onEdit && (
                    <Tooltip title="Редактировать">
                      <IconButton
                        size="small"
                        aria-label="Редактировать владельца"
                        onClick={() => onEdit(owner)}
                      >
                        <MdEdit />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title="Удалить">
                      <IconButton
                        size="small"
                        color="error"
                        aria-label="Удалить владельца"
                        onClick={() => onDelete(owner)}
                      >
                        <MdDelete />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
              <Chip size="small" label={roleLabel} />
            </Box>
          </Stack>

          {(owner.email || owner.phone) && (
            <Typography variant="body2" color="text.secondary">
              {owner.email && (
                <Box component="a" href={`mailto:${owner.email}`}>
                  {owner.email}
                </Box>
              )}
              {owner.email && owner.phone ? " · " : ""}
              {owner.phone && (
                <Box component="a" href={`tel:${owner.phone}`}>
                  +{owner.phone}
                </Box>
              )}
            </Typography>
          )}

          {owner.notes && (
            <Typography variant="body2">{owner.notes}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
