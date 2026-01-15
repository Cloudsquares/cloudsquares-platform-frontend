import React from "react";
import { useTranslation } from "react-i18next";
import { version } from "../../../package.json";

import { useIsAuthenticated } from "../../shared/permissions/hooks";
import { NotAuthInfoBlock } from "../../shared/components/NotAuthInfoBlock";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";
import { BasicNavListToPage } from "../../shared/components/BasicNavListToPage";
import { ProfileInfoCard } from "./components/ProfileInfoCard";
import { ProfileFavoritesLinks } from "./components/ProfileFavoritesLinks";
import { SelectLanguage } from "../../shared/components/SelectLanguage";

const list = [
  { label: "Центр поддержки", link: "/help" },
  { label: "Соглашения и Правила", link: "/docs" },
];

export const ProfileModule = () => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <React.Fragment>
      <BasicPageHeader
        title="Мой профиль"
        shownBackArrowButton
        backButtonLink="/"
      />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        {!isAuthenticated && <NotAuthInfoBlock />}
        {isAuthenticated && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 py-4">
              <ProfileInfoCard />
              <ProfileFavoritesLinks />
              <BasicNavListToPage list={list} />
            </div>
          </div>
        )}
        <div className="grid gap-2 py-4 md:grid-cols-2">
          <div className="space-y-2">
            <SelectLanguage />
            <p className="text-body2 text-grey-400">
              {t("version")} {version}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
