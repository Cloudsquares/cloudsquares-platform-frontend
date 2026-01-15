import { useNavigate } from "react-router-dom";

import { useProfileDetailsStore } from "../../store/useProfileDetailsStore";
import { useLoginStore } from "../../../LoginModule/store";
import { BasicDrawer } from "../../../../shared/components/BasicDrawer";
import { Button } from "@/shared/components/ui/button";

export const ProfileDetailsLogoutDrawer = () => {
  const navigate = useNavigate();
  const { markLogoutPending } = useLoginStore();
  const { showLogoutDrawer, setShowLogoutDrawer } = useProfileDetailsStore();

  const handleLogoutButtonClick = () => {
    markLogoutPending();
    setShowLogoutDrawer(false);
    navigate("/login");
  };

  return (
    <BasicDrawer
      title="Выйти из аккаунта?"
      isOpen={showLogoutDrawer}
      setIsOpen={setShowLogoutDrawer}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1">
          <p className="text-body1 text-foreground">
            Вы уверены, что хотите выйти из текущего аккаунта?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowLogoutDrawer(false)}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogoutButtonClick}
          >
            Да, выйти
          </Button>
        </div>
      </div>
    </BasicDrawer>
  );
};
