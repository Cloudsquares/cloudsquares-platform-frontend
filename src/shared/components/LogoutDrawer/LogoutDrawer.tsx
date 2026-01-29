import { useNavigate } from "react-router-dom";

import { useLoginStore } from "@/modules/LoginModule/store";
import { BasicDrawer } from "@/shared/components/BasicDrawer";
import { Button } from "@/shared/components/ui";

/**
 * Пропсы для компонента `LogoutDrawer`.
 */
interface LogoutDrawerProps {
  /** Флаг открытия дроуера */
  isOpen: boolean;

  /** Обработчик открытия/закрытия */
  setIsOpen: (v: boolean) => void;

  /** Заголовок дроуера */
  title?: string;

  /** Описание внутри дроуера */
  description?: string;

  /** Текст кнопки отмены */
  cancelLabel?: string;

  /** Текст кнопки подтверждения */
  confirmLabel?: string;
}

/**
 * Унифицированный дроуер подтверждения выхода из аккаунта.
 *
 * @param {LogoutDrawerProps} props Пропсы компонента
 * @returns React-компонент дроуера выхода
 */
export const LogoutDrawer = ({
  isOpen,
  setIsOpen,
  title = "Выйти из аккаунта?",
  description = "Вы уверены, что хотите выйти из текущего аккаунта?",
  cancelLabel = "Отмена",
  confirmLabel = "Да, выйти",
}: LogoutDrawerProps) => {
  const navigate = useNavigate();
  const { markLogoutPending } = useLoginStore();

  /**
   * Выполняет выход из аккаунта и закрывает дроуер.
   */
  const handleLogoutButtonClick = () => {
    markLogoutPending();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <BasicDrawer title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1">
          <p className="text-body1 text-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogoutButtonClick}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </BasicDrawer>
  );
};
