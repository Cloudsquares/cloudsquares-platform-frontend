import { User } from "lucide-react";

import { useUserProfile } from "../../../../shared/permissions/hooks";
import { DisplayCountryFlag } from "../../../../shared/components/DisplayCountryFlag";
import { CountryCodeDisplayText } from "../../../../shared/interfaces/Country";
import { displayUserName } from "../../../../shared/utils";
import {
  UserRoleColor,
  UserRoleDisplayText,
} from "../../../../shared/permissions/roles";
import { Badge } from "@/shared/components/ui/Badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";

const roleBadgeClasses = {
  default: "border-border bg-secondary text-foreground",
  error: "border-error/30 bg-error/10 text-error",
  warning: "border-accent/40 bg-accent/10 text-accent",
  info: "border-primary/30 bg-primary/10 text-primary",
  success: "border-success/30 bg-success/10 text-success",
  secondary: "border-border bg-muted text-muted-foreground",
} satisfies Record<string, string>;

export const ProfileDetailsAvatar = () => {
  const profile = useUserProfile();

  if (profile) {
    const { first_name, last_name, middle_name } = profile;
    const { shortName } = displayUserName({
      first_name,
      last_name,
      middle_name,
    });

    const roleClass = roleBadgeClasses[UserRoleColor[profile.role]];

    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border">
          <User className="h-16 w-16 text-muted-foreground" />
        </div>
        <p className="text-body1 text-foreground">{shortName}</p>
        <div className="flex items-center gap-2">
          <span className="text-body1 text-foreground">
            +{profile.phone || "-"}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <DisplayCountryFlag country_code={profile.country_code} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {CountryCodeDisplayText[profile.country_code]}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className={roleClass}>{UserRoleDisplayText[profile.role]}</Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
};
