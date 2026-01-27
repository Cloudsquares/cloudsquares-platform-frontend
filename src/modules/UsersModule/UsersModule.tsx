import React from "react";

import { useUsersStore } from "./store";
import { UsersList } from "./components/UsersList";
import { UsersFormDrawer } from "./components/UsersFormDrawer";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";
import { BasicDrawerMode } from "../../shared/interfaces/Shared";
import { useCanAccess } from "../../shared/permissions/canAccess";
import { Button } from "@/shared/components/ui/button";

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
          <UsersList />
        </div>
      </div>
      <UsersFormDrawer />
    </React.Fragment>
  );
};
