import { usePropertyCategoriesStore } from "../../store";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { Button } from "@/shared/components/ui/button";

export const PropertyCategoriesCreateButton = () => {
  const openDrawerWithMode = usePropertyCategoriesStore(
    (state) => state.openDrawerWithMode,
  );

  return (
    <Button
      type="button"
      size="lg"
      className="h-[66px] w-full md:h-[82px] lg:h-[88px]"
      onClick={() => openDrawerWithMode(BasicDrawerMode.create)}
    >
      + Добавить новую категорию
    </Button>
  );
};
