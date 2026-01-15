import React from "react";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";

export const DashboardsModule = () => {
  return (
    <React.Fragment>
      <BasicPageHeader title="Аналитика" />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <div>Hello Dashboards!</div>
        </div>
      </div>
    </React.Fragment>
  );
};
