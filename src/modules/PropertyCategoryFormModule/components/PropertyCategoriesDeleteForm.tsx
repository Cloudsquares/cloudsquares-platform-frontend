import { PropertyCategory } from "@/shared/interfaces/PropertyCategory";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

interface PropertyCategoriesDeleteFormProps {
  editablePropertyCategory: PropertyCategory | null;
}

export const PropertyCategoriesDeleteForm = ({
  editablePropertyCategory,
}: PropertyCategoriesDeleteFormProps) => {
  if (!editablePropertyCategory) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Удаляемый объект не определен</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1">
      <p className="text-body1 text-foreground">
        Вы уверены, что хотите удалить категорию под названием{" "}
        <strong className="text-error">{editablePropertyCategory.title}</strong>
        ?
      </p>
    </div>
  );
};
