import React from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils";

/**
 * Пропсы для компонента `BasicDrawer`.
 */
interface BasicDrawerProps {
  /** Заголовок, отображаемый в шапке модального окна */
  title: string;

  /** Флаг, определяющий, открыто ли модальное окно (`true` - открыт, `false` - закрыт) */
  isOpen: boolean;

  /** Дочерние элементы, которые будут отображаться внутри модального окна */
  children: React.ReactNode;

  /** Позиция открытого окна */
  anchor?: "top" | "right" | "bottom" | "left";

  /**
   * Функция для управления состоянием модального окна.
   * @param v `true`, если нужно открыть модальное окно, `false` - если закрыть
   */
  setIsOpen: (v: boolean) => void;
}

const drawerPositionClasses = {
  bottom: "inset-x-0 bottom-0 rounded-t-lg",
  top: "inset-x-0 top-0 rounded-b-lg",
  right: "inset-y-0 right-0 h-full w-full max-w-md rounded-l-lg",
  left: "inset-y-0 left-0 h-full w-full max-w-md rounded-r-lg",
} satisfies Record<NonNullable<BasicDrawerProps["anchor"]>, string>;

const drawerHeightClasses = {
  bottom: "h-[95vh]",
  top: "h-[95vh]",
  right: "h-full",
  left: "h-full",
} satisfies Record<NonNullable<BasicDrawerProps["anchor"]>, string>;

const drawerAnimationClasses = {
  bottom:
    "data-[state=open]:slide-in-from-bottom-6 data-[state=closed]:slide-out-to-bottom-6",
  top: "data-[state=open]:slide-in-from-top-6 data-[state=closed]:slide-out-to-top-6",
  right:
    "data-[state=open]:slide-in-from-right-6 data-[state=closed]:slide-out-to-right-6",
  left: "data-[state=open]:slide-in-from-left-6 data-[state=closed]:slide-out-to-left-6",
} satisfies Record<NonNullable<BasicDrawerProps["anchor"]>, string>;

const drawerTransitionClasses =
  "data-[state=open]:duration-200 data-[state=closed]:duration-150";

/**
 * Компонент боковой панели (модального окна) с заголовком и кнопкой закрытия.
 *
 * @param {BasicDrawerProps} props Пропсы компонента
 * @returns React-компонент модального окна
 */
export const BasicDrawer = ({
  children,
  title,
  isOpen,
  anchor = "bottom",
  setIsOpen,
}: BasicDrawerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          "flex flex-col p-0",
          drawerPositionClasses[anchor],
          drawerHeightClasses[anchor],
          drawerAnimationClasses[anchor],
          drawerTransitionClasses,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="ghost" size="sm">
              <X className="h-4 w-4 text-foreground" />
            </Button>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <div className="flex-1 overflow-auto px-4 py-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
