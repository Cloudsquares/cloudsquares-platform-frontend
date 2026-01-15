import React from "react";

import { PropertiesList } from "./components/PropertiesList";
import { PropertiesHeader } from "./components/PropertiesHeader";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";

export const PropertiesModule = () => {
  return (
    <React.Fragment>
      <BasicPageHeader
        title="Каталог недвижимости"
        shownBackArrowButton
        backButtonLink="/"
      />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <PropertiesHeader />
          <PropertiesList />
        </div>
      </div>
    </React.Fragment>
  );
};
