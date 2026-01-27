import React from "react";
import { useNavigate } from "react-router-dom";

import { useHomeStore } from "./store";
import { HomeAgencyInfoDrawer } from "./components/HomeAgencyInfoDrawer";
import { BasicNavListToPage } from "../../shared/components/BasicNavListToPage";
import { BasicNavListToPageItem } from "../../shared/components/BasicNavListToPage/BasicNavListToPage";
import { BasicNavListToDrawer } from "../../shared/components/BasicNavListToDrawer";
import { BasicNavListToDrawerItem } from "../../shared/components/BasicNavListToDrawer/BasicNavListToDrawer";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";

export const HomeModule = () => {
  const navigate = useNavigate();
  const setShowAgencyInfoDrawer = useHomeStore(
    (state) => state.setShowAgencyInfoDrawer,
  );

  const agencyLinks: BasicNavListToDrawerItem[] = [
    { label: "Общая информация", onClick: () => setShowAgencyInfoDrawer(true) },
    { label: "Сотрудники", onClick: () => navigate("/agency/users") },
  ];
  const propertiesLinks: BasicNavListToPageItem[] = [
    { label: "Добавить объект", link: "/properties/create" },
    { label: "Каталог недвижимости", link: "/properties" },
    { label: "Категории недвижимости", link: "/properties/categories" },
    { label: "База собственников", link: "/properties/owners" },
  ];
  const requestsLinks: BasicNavListToPageItem[] = [
    { label: "Заявки на покупку", link: "/" },
    { label: "Заявки на продажу", link: "/" },
  ];

  return (
    <React.Fragment>
      <BasicPageHeader title="Панель управления" />
      <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="space-y-2">
              <h5 className="text-h6 text-foreground">Мое агентство</h5>
              <BasicNavListToDrawer list={agencyLinks} />
            </div>
            <div className="space-y-2">
              <h5 className="text-h6 text-foreground">Недвижимость</h5>
              <BasicNavListToPage list={propertiesLinks} />
            </div>
            <div className="space-y-2">
              <h5 className="text-h6 text-foreground">Заявки</h5>
              <BasicNavListToPage list={requestsLinks} />
            </div>
          </div>
        </div>
        <HomeAgencyInfoDrawer />
      </div>
    </React.Fragment>
  );
};
