import React from "react";

import { UsersFormDrawer } from "@/modules/UsersModule/components/UsersFormDrawer";
import { UsersList } from "@/modules/UsersModule/components/UsersList";
import { useUsersStore } from "@/modules/UsersModule/store";
import { BasicPageHeader } from "@/shared/components/Mobile/BasicPageHeader";
import { SearchInputWrapper } from "@/shared/components/SearchInputWrapper";
import { Button } from "@/shared/components/ui";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { useCanAccess } from "@/shared/permissions/canAccess";

export const UsersModule = () => {
  const openDrawerWithMode = useUsersStore((state) => state.openDrawerWithMode);
  const canCreateNewUser = useCanAccess("createNewUser");

  return (
    <React.Fragment>
      <BasicPageHeader title="Сотрудники" shownBackArrowButton />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-h2 text-foreground">Сотрудники</h1>
            {canCreateNewUser && (
              <Button
                type="button"
                className="bg-success text-white hover:bg-success/90"
                onClick={() => openDrawerWithMode(BasicDrawerMode.create)}
              >
                + Добавить
              </Button>
            )}
          </div>
          <SearchInputWrapper
            placeholder="Поиск по сотрудникам"
            className="w-full max-w-md"
          />
          <UsersList />
        </div>
      </div>
      <UsersFormDrawer />
    </React.Fragment>
  );
};
