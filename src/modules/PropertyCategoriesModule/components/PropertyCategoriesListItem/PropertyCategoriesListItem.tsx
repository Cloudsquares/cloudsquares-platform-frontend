import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { PropertyCategory } from "@/shared/interfaces/PropertyCategory";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { usePropertyCategoriesStore } from "../../store";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

interface PropertyCategoriesListItemProps {
  category: PropertyCategory;
}

export const PropertyCategoriesListItem = ({
  category,
}: PropertyCategoriesListItemProps) => {
  const setEditablePropertyCategory = usePropertyCategoriesStore(
    (state) => state.setEditablePropertyCategory,
  );
  const openDrawerWithMode = usePropertyCategoriesStore(
    (state) => state.openDrawerWithMode,
  );

  const handleUpdateButtonClick = () => {
    setEditablePropertyCategory(category);
    openDrawerWithMode(BasicDrawerMode.edit);
  };

  const handleDeleteButtonClick = () => {
    setEditablePropertyCategory(category);
    openDrawerWithMode(BasicDrawerMode.delete);
  };

  const isSubcategory =
    (category.parent_id ?? category.level > 0) ? true : false;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
      <button type="button" className="text-muted-foreground">
        <GripVertical className="h-6 w-6" />
      </button>
      <div className="flex-1">
        <p className="text-h6 text-foreground">{category.title}</p>
        <p className="text-body2 text-muted-foreground">
          {isSubcategory ? "Подкатегория" : "Главная категория"}
        </p>
      </div>
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleUpdateButtonClick}
              >
                <Pencil className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Редактировать</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={handleDeleteButtonClick}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Удалить</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
