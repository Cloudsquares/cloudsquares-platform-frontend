import { PropertyCategoriesFormDrawer } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesFormDrawer";
import { PropertyCategoriesList } from "@/modules/PropertyCategoriesModule/components/PropertyCategoriesList";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";

export const PropertyCategoriesContent = () => (
  <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
    <div className="grid gap-4">
      <h1 className="text-h3 text-foreground">Категории недвижимости</h1>
      <SearchInputWrapper
        placeholder="Поиск по категориям"
        className="w-full max-w-md"
      />
      <PropertyCategoriesList />
      <PropertyCategoriesFormDrawer />
    </div>
  </div>
);
