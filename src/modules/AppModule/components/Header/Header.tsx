import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HeaderNavigation } from "../HeaderNavigation";
import { HeaderLogotype } from "../HeaderLogotype";
import { useIsAuthenticated } from "../../../../shared/permissions/hooks";
import { HeaderProfile } from "../HeaderProfile";
import { Button } from "@/shared/components/ui/button";

export const Header = () => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <header
      data-testid="header"
      className="hidden border-b border-grey-200 bg-white lg:block"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <HeaderLogotype />
          <HeaderNavigation />
        </div>
        {!isAuthenticated && (
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="md">
              {t("request_demo")}
            </Button>
            <Button asChild>
              <Link to="/login">{t("login")}</Link>
            </Button>
          </div>
        )}
        {isAuthenticated && <HeaderProfile />}
      </div>
    </header>
  );
};
