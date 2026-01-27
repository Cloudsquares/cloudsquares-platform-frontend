import { ChevronRight } from "lucide-react";

import { cn } from "@/shared/utils";

export interface BasicNavListToDrawerItem {
  label: string;
  onClick: () => void;
}

interface BasicNavListToDrawerProps {
  list: BasicNavListToDrawerItem[];
}

export const BasicNavListToDrawer = ({ list }: BasicNavListToDrawerProps) => {
  return (
    <div className="rounded-md border border-border bg-card py-2">
      <ul>
        {list.map(({ label, onClick }, index) => (
          <li key={`${label}-${index}`}>
            <button
              type="button"
              onClick={onClick}
              className={cn(
                "flex w-full items-center gap-2 px-4 py-3 text-body2 text-foreground",
                index < list.length - 1 && "border-b border-border",
              )}
            >
              <span>{label}</span>
              <span className="ml-auto flex items-center">
                <ChevronRight
                  data-testid="fa-icon"
                  className="h-4 w-4 text-foreground"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
