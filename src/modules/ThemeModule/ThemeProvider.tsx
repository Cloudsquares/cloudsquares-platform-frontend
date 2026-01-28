import * as React from "react";

type ThemeName = "light" | "dark";

type ThemePreference = ThemeName | null;

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ThemeName;
  setTheme: (nextTheme: ThemeName | null) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "cloudsquares-theme";

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

const getStoredTheme = (): ThemePreference => {
  if (typeof window === "undefined") return null;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return null;
};

const getSystemTheme = (): ThemeName => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] =
    React.useState<ThemePreference>(getStoredTheme);
  const [systemTheme, setSystemTheme] =
    React.useState<ThemeName>(getSystemTheme);

  const resolvedTheme = theme ?? systemTheme;

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    if (theme) {
      root.setAttribute("data-theme", theme);
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      return;
    }

    root.removeAttribute("data-theme");
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  }, [theme]);

  const setTheme = React.useCallback((nextTheme: ThemeName | null) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((currentTheme) => {
      const nextBase = currentTheme ?? systemTheme;
      return nextBase === "dark" ? "light" : "dark";
    });
  }, [systemTheme]);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [resolvedTheme, setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Хук для доступа к состоянию и управлению темой.
 *
 * @returns Контекст темы с текущими значениями и действиями.
 */
export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
