import {
  DisplayTextPropertyOwnerRole,
  PropertyOwner,
} from "@/shared/interfaces/PropertyOwner";
import { displayUserName } from "@/shared/utils";
import { Pencil, Trash2 } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui";
import { cn } from "@/shared/utils";

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
    <Card>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-subtitle1 text-foreground">{fullName}</p>

            <div className="flex items-center gap-3">
              {showActions && (onEdit || onDelete) && (
                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label="Редактировать владельца"
                            onClick={() => onEdit(owner)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Редактировать</TooltipContent>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label="Удалить владельца"
                            onClick={() => onDelete(owner)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Удалить</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              )}
              <Badge>{roleLabel}</Badge>
            </div>
          </div>

          {(owner.email || owner.phone) && (
            <p className="text-body2 text-muted-foreground">
              {owner.email && (
                <a
                  href={`mailto:${owner.email}`}
                  className="hover:text-foreground"
                >
                  {owner.email}
                </a>
              )}
              {owner.email && owner.phone ? " · " : ""}
              {owner.phone && (
                <a
                  href={`tel:${owner.phone}`}
                  className="hover:text-foreground"
                >
                  +{owner.phone}
                </a>
              )}
            </p>
          )}

          {owner.notes && (
            <p className={cn("text-body2 text-foreground")}>{owner.notes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
