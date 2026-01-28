import * as React from "react";

export type ThemeName = "light" | "dark";

export type ThemePreference = ThemeName | null;

export interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ThemeName;
  setTheme: (nextTheme: ThemeName | null) => void;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);
