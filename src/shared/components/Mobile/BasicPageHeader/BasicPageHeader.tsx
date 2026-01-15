import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

import { Button } from "@/shared/components/ui/button";

/**
 * Пропсы для компонента BasicPageHeader.
 */
interface BasicPageHeaderProps {
  /** Заголовок страницы */
  title: string;
  /** Нужно ли отображать кнопку назад */
  shownBackArrowButton?: boolean;
  /** Ссылка fallback, если история недоступна или переход на внешний сайт */
  backButtonLink?: string;
}

/**
 * Компонент заголовка страницы.
 *
 * - Отображает заголовок.
 * - Опционально отображает кнопку "Назад" слева.
 * - Если пользователь переходит на внешний сайт, используется `backButtonLink` или редирект на главную.
 *
 * @param {BasicPageHeaderProps} props Пропсы компонента
 * @returns React-компонент заголовка страницы
 */
export const BasicPageHeader = ({
  title,
  shownBackArrowButton = false,
  backButtonLink,
}: BasicPageHeaderProps) => {
  const navigate = useNavigate();

  /**
   * Обработчик клика по кнопке назад.
   */
  const handleBackClick = () => {
    if (backButtonLink) {
      navigate(backButtonLink);
    } else if (window.history.length > 1) {
      return navigate(-1);
    } else {
      return navigate("/");
    }
  };

  return (
    <div className="flex w-full items-center border-b border-grey-300 bg-white px-4 py-3 lg:hidden">
      {shownBackArrowButton && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="mr-2"
        >
          <IoArrowBackSharp size={16} color="#1c1c1c" />
        </Button>
      )}
      <h5 className="text-h5 text-foreground">{title}</h5>
    </div>
  );
};
