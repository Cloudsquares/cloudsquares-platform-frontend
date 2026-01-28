import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

import { useUserProfile } from "../../../../shared/permissions/hooks";
import { displayUserName } from "../../../../shared/utils";
import { Skeleton } from "@/shared/components/ui";

export const ProfileInfoCard = () => {
  const profile = useUserProfile();

  if (profile) {
    const { first_name, last_name, middle_name } = profile;
    const { shortName } = displayUserName({
      first_name,
      last_name,
      middle_name,
    });

    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <Link
          to="/profile/details"
          className="flex items-center gap-4 text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground font-semibold">
            {shortName?.[0] ?? "М"}
          </div>
          <div>
            <p className="text-body2 font-semibold text-foreground">
              {shortName}
            </p>
            <p className="text-caption1 text-muted-foreground">
              Просмотр профиля
            </p>
          </div>
          <span className="ml-auto">
            <Settings className="h-4 w-4 text-foreground" />
          </span>
        </Link>
      </div>
    );
  }

  return <Skeleton className="h-[72px] w-full" />;
};
