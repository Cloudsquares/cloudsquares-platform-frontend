import { MdDelete, MdEdit } from "react-icons/md";
import { User, UserStatus } from "@/shared/interfaces";
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
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils";

interface UsersListItemProps {
  user: User;
}

const statusClasses = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-accent/40 bg-accent/10 text-accent",
  error: "border-error/30 bg-error/10 text-error",
  info: "border-primary/30 bg-primary/10 text-primary",
} satisfies Record<string, string>;

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

  const statusKey = getUserStatusChipColor(user.user_status.status);
  const statusClassName = statusClasses[statusKey];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3 pb-3">
        <Badge className={cn("border", statusClassName)}>
          {getUserStatusLabel(user.user_status.status)}
        </Badge>
        {canDeleteUsers && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClickEditIconButton}
            >
              <MdEdit />
            </Button>
            {user.role !== UserRole.agent_admin && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClickDeleteIconButton}
                className="text-error hover:text-error"
              >
                <MdDelete />
              </Button>
            )}
          </div>
        )}
      </div>
      <h6 className="text-h6 text-foreground">{shortName}</h6>
      <ul className="space-y-2 pt-2 text-body2 text-labels-secondary">
        <li>Телефон: +{user.phone}</li>
        <li>Почта: {user.email || "Не указана"}</li>
        <li>Роль: {UserRoleDisplayText[user.role]}</li>
        {user.user_status.description && (
          <li>Причина: {user.user_status.description}</li>
        )}
        {user.user_status.status === UserStatus.deactivated &&
          user.user_status.changed_at && (
            <li>
              Деактивирован: {formatDateTime(user.user_status.changed_at, true)}
            </li>
          )}
      </ul>
    </div>
  );
};
