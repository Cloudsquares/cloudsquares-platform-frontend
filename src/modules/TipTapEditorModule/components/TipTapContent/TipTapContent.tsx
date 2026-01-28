import * as React from "react";
import "@/modules/TipTapEditorModule/styles/tiptap-content.scss";
import { cn } from "@/shared/utils";

export interface TipTapContentProps {
  /** Санитизированный HTML от TipTap (с сервера). */
  html?: string | null;
  /** Дополнительные классы контейнера. */
  className?: string;
  /** Фолбек для пустого содержимого. */
  emptyFallback?: React.ReactNode;
}

/**
 * TipTapContent — read-only viewer для безопасного HTML из TipTap.
 *
 * @param props - Пропсы компонента.
 * @param props.html - Санитизированный HTML (string).
 * @param props.className - Дополнительные классы контейнера.
 * @param props.emptyFallback - Фолбек для пустого содержимого.
 * @returns React-элемент с HTML-рендером описания.
 */
export const TipTapContent: React.FC<TipTapContentProps> = ({
  html,
  className,
  emptyFallback,
}) => {
  if (!html) {
    if (!emptyFallback) return null;

    return (
      <div className={cn("tiptap-content", className)}>{emptyFallback}</div>
    );
  }

  return (
    <div
      className={cn("tiptap-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
