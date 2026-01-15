import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserAlt, FaHome, FaSearch } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";

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
    <nav className="fixed bottom-0 z-20 grid w-full grid-cols-4 border-t border-grey-300 bg-white p-4 md:hidden">
      <NavLink
        to="/"
        end
        data-testid="nav-item-home"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-labels-primary" : "text-grey-400",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <FaHome size={16} color={isActive ? "#1c1c1c" : "#cccccc"} />
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
            isActive ? "text-labels-primary" : "text-grey-400",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <FaSearch size={16} color={isActive ? "#1c1c1c" : "#cccccc"} />
            <span>Каталог</span>
          </React.Fragment>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        data-testid="nav-item-cart"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center gap-1 text-caption1 transition-colors",
            isActive ? "text-labels-primary" : "text-grey-400",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <IoDocuments size={16} color={isActive ? "#1c1c1c" : "#cccccc"} />
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
            isActive ? "text-labels-primary" : "text-grey-400",
          )
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <FaUserAlt size={16} color={isActive ? "#1c1c1c" : "#cccccc"} />
            <span>Профиль</span>
          </React.Fragment>
        )}
      </NavLink>
    </nav>
  );
};
