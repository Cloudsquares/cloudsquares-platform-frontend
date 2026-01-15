import React from "react";
import { BasicPageHeader } from "@/shared/components/Mobile/BasicPageHeader";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { PropertyFormModule } from "../PropertyFormModule";

export const PropertyCreateModule = () => {
  return (
    <React.Fragment>
      <BasicPageHeader title="Создание объекта" shownBackArrowButton />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col px-4">
        <PropertyFormModule mode={PropertyFormMode.create} />
      </div>
    </React.Fragment>
  );
};
