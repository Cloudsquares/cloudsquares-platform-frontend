import { Moon, Sun } from "lucide-react";

import { cn } from "@/shared/utils";
import { useTheme } from "@/modules/ThemeModule/hooks";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1",
        className,
      )}
      role="group"
      aria-label="Переключатель темы"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={isLight}
        aria-label="Светлая тема"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isLight
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={!isLight}
        aria-label="Темная тема"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !isLight
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
};
