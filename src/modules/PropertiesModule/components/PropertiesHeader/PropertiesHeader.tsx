import { PropertiesFilter } from "../PropertiesFilter";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";

export const PropertiesHeader = () => {
  return (
    <div className="grid items-center gap-4 pt-4 lg:grid-cols-2 lg:pt-0">
      <h1 className="hidden text-h3 text-foreground lg:block">
        Каталог недвижимости
      </h1>
      <div className="flex items-center justify-end gap-4">
        <SearchInputWrapper
          placeholder="Поиск по объектам"
          pageParamToReset="page"
        />
        <PropertiesFilter />
      </div>
    </div>
  );
};
