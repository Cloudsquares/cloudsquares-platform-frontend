import React from "react";
import { BasicPageHeader } from "@/shared/components/Mobile/BasicPageHeader";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { PropertyFormModule } from "../PropertyFormModule";

export const PropertyUpdateModule = () => {
  return (
    <React.Fragment>
      <BasicPageHeader title="Обновление объекта" shownBackArrowButton />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col px-4">
        <PropertyFormModule mode={PropertyFormMode.edit} />
      </div>
    </React.Fragment>
  );
};
