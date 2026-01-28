import React from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";

// TODO: решить нужен ли бургер меню на мобилке или все ссылки будут в профиле
export const HeaderNavigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pages = [
    { title: t("header.navigation.properties"), link: "/properties" },
    { title: t("header.navigation.requests"), link: "/requests" },
    { title: t("header.navigation.analytics"), link: "/agency/dashboards" },
    { title: t("header.navigation.customers"), link: "/agency/customers" },
  ];

  const handleClickMenuItem = (link: string) => {
    navigate(link);
  };

  return (
    <React.Fragment>
      <div className="flex items-center md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="sm" aria-label="menu">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {pages.map(({ title, link }) => (
              <DropdownMenuItem
                key={link}
                onSelect={() => handleClickMenuItem(link)}
              >
                {title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {pages.map(({ title, link }) => (
          <Button
            key={link}
            onClick={() => handleClickMenuItem(link)}
            variant="ghost"
            size="md"
          >
            {title}
          </Button>
        ))}
      </div>
    </React.Fragment>
  );
};
