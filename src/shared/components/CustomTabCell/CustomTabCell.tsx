import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/utils";

/**
 * Опции выпадающего меню внутри ячейки таблицы.
 */
interface CustomTableCellOptions {
  /** Текст или элемент, отображаемый в меню */
  label: string | React.ReactNode;

  /** Функция, вызываемая при выборе опции */
  onClick: () => void;
}

/**
 * Пропсы для компонента `CustomTableCell`.
 */
interface CustomTableCellProps {
  /** Текст, отображаемый в ячейке */
  text: string;

  /** Жирность шрифта (необязательно) */
  fw?: number;

  /** Ширина ячейки (в пикселях или в процентах) */
  width?: string | number;

  /** Выравнивание текста внутри ячейки */
  align?: "inherit" | "left" | "center" | "right" | "justify";

  /** Опциональное выпадающее меню с действиями */
  options?: CustomTableCellOptions[] | null;
}

const alignClasses = {
  inherit: "text-left",
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} satisfies Record<NonNullable<CustomTableCellProps["align"]>, string>;

const alignContainerClasses = {
  inherit: "justify-start",
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  justify: "justify-between",
} satisfies Record<NonNullable<CustomTableCellProps["align"]>, string>;

/**
 * Компонент ячейки таблицы с возможностью отображения выпадающего меню.
 *
 * Может просто отображать текст или включать кнопку для вызова выпадающего списка опций.
 *
 * @param {CustomTableCellProps} props Пропсы компонента
 * @returns React-компонент ячейки таблицы
 */
export const CustomTableCell = ({
  text,
  width,
  fw,
  align = "center",
  options,
}: CustomTableCellProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <td
      className={cn(
        "px-3 py-2 text-body2 text-foreground",
        alignClasses[align],
      )}
      style={{ width, fontWeight: fw }}
    >
      <div
        className={cn("flex items-center gap-2", alignContainerClasses[align])}
      >
        <span className="inline-flex items-center gap-2 text-body2 text-foreground">
          {text}
        </span>
        {options && options.length > 0 && (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-expanded={isOpen}
              >
                {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {options.map(({ label, onClick }, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => {
                    onClick();
                    setIsOpen(false);
                  }}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </td>
  );
};
