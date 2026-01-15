import React from "react";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";
import { PropertyOwnersTable } from "./components/PropertyOwnersTable";

export const PropertyOwnersModule = () => {
  return (
    <React.Fragment>
      <BasicPageHeader title="База собственников" shownBackArrowButton />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <div className="hidden md:block">
            <h1 className="text-h1 text-foreground">База собственников</h1>
          </div>
          <div>Filters and search</div>
          <PropertyOwnersTable />
        </div>
      </div>
    </React.Fragment>
  );
};
