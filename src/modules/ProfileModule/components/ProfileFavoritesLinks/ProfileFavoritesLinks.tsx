import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";

export const ProfileFavoritesLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <Link
          to="/properties"
          className="flex items-center gap-3 text-foreground"
        >
          <FaHome size={20} color="#1c1c1c" />
          <span className="text-body2 text-labels-primary">Недвижимость</span>
        </Link>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <Link
          to="/requests"
          className="flex items-center gap-3 text-foreground"
        >
          <IoDocuments size={20} color="#1c1c1c" />
          <span className="text-body2 text-labels-primary">Заявки</span>
        </Link>
      </div>
    </div>
  );
};
