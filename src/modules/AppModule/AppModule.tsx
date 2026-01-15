import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ru } from "date-fns/locale";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { RouteList } from "../../routelist";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ToasterProvider, AuthProvider } from "../../providers";
import { customTheme } from "../../themes/customTheme";

import { BottomNavigationMenu } from "../../shared/components/Mobile/BottomNavigationMenu";

const client = new QueryClient();

/**
 * Основной модуль приложения.
 *
 * - Включает глобальные провайдеры: маршрутизацию, управление запросами (`react-query`),
 *   тему MUI, локализацию `date-fns`, `AuthProvider` и `ToasterProvider`.
 * - Управляет состоянием загрузки через `isLoading`.
 * - Отображает `RouteList` в качестве основного контента.
 * - Включает `Header` и `Footer`.
 *
 * @returns React-компонент корневого модуля приложения.
 */
export const AppModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Router>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            {isLoading ? (
              <div className="flex h-screen items-center justify-center pointer-events-none">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
              </div>
            ) : (
              <div className="wrapper">
                <Header />
                <main className="content">
                  <React.Suspense>
                    <RouteList />
                  </React.Suspense>
                  <BottomNavigationMenu />
                </main>
                <Footer />
              </div>
            )}
            <AuthProvider setIsLoading={setIsLoading} />
            <ToasterProvider />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
};
