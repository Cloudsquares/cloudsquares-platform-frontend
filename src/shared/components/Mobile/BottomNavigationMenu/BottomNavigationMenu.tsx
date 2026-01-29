import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FileText, Home, Plus, Search, User } from "lucide-react";

import { cn } from "@/shared/utils";
import { shouldShowBottomNav } from "./utils";

/**
 * Компонент нижнего меню навигации.
 *
 * Особенности:
 * - Показывается только на мобильных (display: { xs: "grid", md: "none" });
 * - Не рендерится на страницах, соответствующих паттернам из BOTTOM_NAV_HIDDEN_PATTERNS;
 * - Подсвечивает активный пункт по текущему пути.
 */
export const BottomNavigationMenu: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const visible = shouldShowBottomNav(pathname);
  if (!visible) return null;

  return (
    <nav className="fixed bottom-0 z-20 grid w-full grid-cols-5 border-t border-border bg-background p-4 md:hidden">
      <NavLink
        to="/"
        end
        data-testid="nav-item-home"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <Home
              className={cn(
                "h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
            <span>Главная</span>
          </React.Fragment>
        )}
      </NavLink>

      <NavLink
        to="/properties"
        data-testid="nav-item-properties"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <Search
              className={cn(
                "h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
            <span>Каталог</span>
          </React.Fragment>
        )}
      </NavLink>

      <NavLink
        to="/properties/create"
        data-testid="nav-item-add-property"
        aria-label="Добавить объект"
        className="flex items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
          <Plus className="h-5 w-5" />
        </span>
      </NavLink>

      <NavLink
        to="/cart"
        data-testid="nav-item-cart"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <FileText
              className={cn(
                "h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
            <span>Заявки</span>
          </React.Fragment>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        data-testid="nav-item-profile"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <User
              className={cn(
                "h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            />
            <span>Профиль</span>
          </React.Fragment>
        )}
      </NavLink>
    </nav>
  );
};
