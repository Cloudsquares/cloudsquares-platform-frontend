import React from "react";
import { useUserProfile } from "../../../../shared/permissions/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export const HeaderProfile = () => {
  const { t } = useTranslation();
  const profile = useUserProfile();
  const navigate = useNavigate();

  const settings = [
    {
      title: t("header.profile_menu.profile"),
      link: "/profile",
    },
    {
      title: t("header.profile_menu.estates"),
      link: "/profile",
    },
    {
      title: t("header.profile_menu.requests"),
      link: "/profile",
    },
    {
      title: t("header.profile_menu.logout"),
      link: "/profile",
    },
  ];

  const fullName = [profile?.last_name, profile?.first_name]
    .filter(Boolean)
    .join(" ");
  const initials = profile?.first_name?.[0] ?? "?";

  const handleClickMenuItem = (link: string) => {
    navigate(link);
  };

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 text-body1 text-foreground"
                  aria-label={t("header.profile_menu.tooltip_title")}
                >
                  <span className="font-semibold">{fullName}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-200 text-body3 text-foreground">
                    {initials}
                  </span>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{t("header.profile_menu.tooltip_title")}</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            {settings.map(({ link, title }) => (
              <DropdownMenuItem
                key={title}
                onSelect={() => handleClickMenuItem(link)}
              >
                {title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
    </div>
  );
};
