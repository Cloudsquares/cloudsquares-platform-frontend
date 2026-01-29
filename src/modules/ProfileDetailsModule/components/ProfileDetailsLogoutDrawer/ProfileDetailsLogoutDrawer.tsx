import { useProfileDetailsStore } from "@/modules/ProfileDetailsModule/store/useProfileDetailsStore";
import { LogoutDrawer } from "@/shared/components/LogoutDrawer";

export const ProfileDetailsLogoutDrawer = () => {
  const { showLogoutDrawer, setShowLogoutDrawer } = useProfileDetailsStore();

  return (
    <LogoutDrawer isOpen={showLogoutDrawer} setIsOpen={setShowLogoutDrawer} />
  );
};
