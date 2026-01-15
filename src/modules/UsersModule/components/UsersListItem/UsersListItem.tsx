import { MdDelete, MdEdit } from "react-icons/md";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { User } from "@/shared/interfaces";
import {
  displayUserName,
  formatDateTime,
  getUserStatusChipColor,
  getUserStatusLabel,
} from "@/shared/utils";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { useCanAccess } from "@/shared/permissions/canAccess";
import { UserRole, UserRoleDisplayText } from "@/shared/permissions/roles";
import { useUsersStore } from "../../store";
import { titleWrapperStyles } from "./styles";

interface UsersListItemProps {
  user: User;
}

// TODO: Добавить информацию о последнем входе в систему, дату и время
export const UsersListItem = ({ user }: UsersListItemProps) => {
  const openDrawerWithMode = useUsersStore((state) => state.openDrawerWithMode);
  const setEditableUser = useUsersStore((state) => state.setEditableUser);
  const canDeleteUsers = useCanAccess("deleteUsers");

  const { first_name, last_name, middle_name } = user;
  const { shortName } = displayUserName({ first_name, last_name, middle_name });

  const handleClickEditIconButton = () => {
    openDrawerWithMode(BasicDrawerMode.edit);
    setEditableUser(user);
  };

  const handleClickDeleteIconButton = () => {
    openDrawerWithMode(BasicDrawerMode.delete);
    setEditableUser(user);
  };

  return (
    <Box component={Paper} p={2} height="100%">
      <Box sx={titleWrapperStyles}>
        <Chip
          size="small"
          variant="filled"
          color={getUserStatusChipColor(user.user_status.status)}
          label={getUserStatusLabel(user.user_status.status)}
          title={user.user_status.description ?? undefined}
        />
        {canDeleteUsers && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              color="info"
              onClick={handleClickEditIconButton}
            >
              <MdEdit />
            </IconButton>
            {user.role !== UserRole.agent_admin && (
              <IconButton
                size="small"
                color="error"
                onClick={handleClickDeleteIconButton}
              >
                <MdDelete />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
      <Typography component="h6" variant="h6">
        {shortName}
      </Typography>
      <Box
        component="ul"
        sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 1 }}
      >
        <Box component="li">Телефон: +{user.phone}</Box>
        <Box component="li">Почта: {user.email || "Не указана"}</Box>
        <Box component="li">Роль: {UserRoleDisplayText[user.role]}</Box>
        {user.user_status.description && (
          <Box component="li">Причина: {user.user_status.description}</Box>
        )}
        {user.user_status.status === "deactivated" && user.user_status.changed_at && (
          <Box component="li">
            Деактивирован: {formatDateTime(user.user_status.changed_at, true)}
          </Box>
        )}
      </Box>
    </Box>
  );
};
