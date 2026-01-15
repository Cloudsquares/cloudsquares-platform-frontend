import { UserRole } from "../permissions/roles";
import { AgencySlim } from "./Agency";
import { CountryCode } from "./Country";

export interface UserSlim {
  id: string;
  phone: string;
  first_name: string;
  last_name: string | null;
  middle_name: string | null;
}
export enum UserStatus {
  active = "active",
  banned = "banned",
  pending = "pending",
  verification_required = "verification_required",
  deactivated = "deactivated",
}

export interface UserStatusInfo {
  status: UserStatus;
  description: string | null;
  changed_at: string | null;
  changed_by_id: string | null;
}

export interface User extends UserSlim {
  role: UserRole;
  country_code: CountryCode;
  user_status: UserStatusInfo;
  email: string;
  agency: AgencySlim | null;
  created_at: string;
  updated_at: string;
}

export interface PostNewUserResponseData {
  user: User;
  access_token: string;
  refresh_token: string;
}
