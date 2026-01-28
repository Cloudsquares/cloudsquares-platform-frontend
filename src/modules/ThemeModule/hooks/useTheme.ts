import * as React from "react";

import { ThemeContext } from "../ThemeContext";

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
