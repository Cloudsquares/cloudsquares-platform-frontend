import { PropertyCategoriesList } from "../PropertyCategoriesList";
import { PropertyCategoriesFormDrawer } from "../PropertyCategoriesFormDrawer";

export const PropertyCategoriesContent = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
      <div className="grid gap-4">
        <h1 className="text-h3 text-foreground">Категории недвижимости</h1>
        <PropertyCategoriesList />
        <PropertyCategoriesFormDrawer />
      </div>
    </div>
  );
};
