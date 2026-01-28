import { Link } from "react-router-dom";

import { FileText, Home } from "lucide-react";

export const ProfileFavoritesLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <Link
          to="/properties"
          className="flex items-center gap-3 text-foreground"
        >
          <Home className="h-5 w-5 text-foreground" />
          <span className="text-body2 text-foreground">Недвижимость</span>
        </Link>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <Link
          to="/requests"
          className="flex items-center gap-3 text-foreground"
        >
          <FileText className="h-5 w-5 text-foreground" />
          <span className="text-body2 text-foreground">Заявки</span>
        </Link>
      </div>
    </div>
  );
};
