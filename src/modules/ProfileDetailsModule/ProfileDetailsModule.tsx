import React from "react";

import { useProfileDetailsStore } from "./store/useProfileDetailsStore";
import { ProfileDetailsAvatar } from "./components/ProfileDetailsAvatar";
import { ProfileDetailsEditUserDrawer } from "./components/ProfileDetailsEditUserDrawer";
import { ProfileDetailsLogoutDrawer } from "./components/ProfileDetailsLogoutDrawer";

import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";
import { BasicNavListToDrawer } from "../../shared/components/BasicNavListToDrawer";
import { BasicNavListToDrawerItem } from "../../shared/components/BasicNavListToDrawer/BasicNavListToDrawer";

export const ProfileDetailsModule = () => {
  const { setShowEditProfileDrawer, setShowLogoutDrawer } =
    useProfileDetailsStore();

  const navList: BasicNavListToDrawerItem[] = [
    { label: "Личные данные", onClick: () => setShowEditProfileDrawer(true) },
    {
      label: "Выйти из аккаунта",
      onClick: () => setShowLogoutDrawer(true),
    },
  ];

  return (
    <React.Fragment>
      <BasicPageHeader
        title="Детали профиля"
        shownBackArrowButton
        backButtonLink="/profile"
      />
      <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
        <div className="grid gap-4">
          <ProfileDetailsAvatar />
          <BasicNavListToDrawer list={navList} />
        </div>
      </div>
      <ProfileDetailsEditUserDrawer />
      <ProfileDetailsLogoutDrawer />
    </React.Fragment>
  );
};
