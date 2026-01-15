import { FaAngleRight } from "react-icons/fa";

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
                index < list.length - 1 && "border-b border-grey-200",
              )}
            >
              <span>{label}</span>
              <span className="ml-auto flex items-center">
                <FaAngleRight data-testid="fa-icon" size={16} color="#1c1c1c" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
