import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/shared/utils";

export interface BasicNavListToPageItem {
  label: string;
  link: string;
}

interface BasicNavListToPageProps {
  list: BasicNavListToPageItem[];
}

export const BasicNavListToPage = ({ list }: BasicNavListToPageProps) => {
  return (
    <div className="rounded-md border border-border bg-card py-2">
      <ul>
        {list.map(({ label, link }, index) => (
          <li key={`${label}-${index}`}>
            <Link
              to={link}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-body2 text-foreground",
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
