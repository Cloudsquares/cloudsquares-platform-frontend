import { PropertiesSearchWrapper } from "../PropertiesSearchWrapper";
import { PropertiesFilter } from "../PropertiesFilter";

export const PropertiesHeader = () => {
  return (
    <div className="grid items-center gap-4 pt-4 lg:grid-cols-2 lg:pt-0">
      <h1 className="hidden text-h3 text-foreground lg:block">
        Каталог недвижимости
      </h1>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <PropertiesSearchWrapper />
        <PropertiesFilter />
      </div>
    </div>
  );
};
