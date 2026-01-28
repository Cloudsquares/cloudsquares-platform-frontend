import * as React from "react";
import { type Editor } from "@tiptap/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";

// --- Hooks ---
import { useTiptapEditor } from "@/modules/TipTapEditorModule/hooks/use-tiptap-editor";
import { useIsMobile } from "@/modules/TipTapEditorModule/hooks/use-mobile";

// --- Lib ---
import {
  isMarkInSchema,
  isNodeTypeSelected,
} from "@/modules/TipTapEditorModule/lib/tiptap-utils";

// --- Icons ---
import { HighlighterIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/highlighter-icon";
import { TFunction } from "i18next";

export const COLOR_HIGHLIGHT_SHORTCUT_KEY = "mod+shift+h";

/**
 * Тип описания цвета подсветки.
 * label — локализованный текст, value — CSS-переменная/цвет, border — контраст для бордера.
 */
export type HighlightColor = {
  label: string;
  value: string;
  border: string;
};

/**
 * Базовый список цветов (ключи i18n + значения CSS-переменных).
 * Лейблы получаем через i18n на лету функцией localizeHighlightColors.
 */
const HIGHLIGHT_COLOR_PRESETS: Array<{
  i18nKey: string;
  fallback: string;
  value: string;
  border: string;
}> = [
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.default",
    fallback: "Default background",
    value: "var(--tt-bg-color)",
    border: "var(--tt-bg-color-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.accent",
    fallback: "Accent background",
    value: "var(--tt-color-highlight-accent)",
    border: "var(--tt-color-highlight-accent-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.gray",
    fallback: "Gray background",
    value: "var(--tt-color-highlight-gray)",
    border: "var(--tt-color-highlight-gray-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.brown",
    fallback: "Brown background",
    value: "var(--tt-color-highlight-brown)",
    border: "var(--tt-color-highlight-brown-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.orange",
    fallback: "Orange background",
    value: "var(--tt-color-highlight-orange)",
    border: "var(--tt-color-highlight-orange-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.yellow",
    fallback: "Yellow background",
    value: "var(--tt-color-highlight-yellow)",
    border: "var(--tt-color-highlight-yellow-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.green",
    fallback: "Green background",
    value: "var(--tt-color-highlight-green)",
    border: "var(--tt-color-highlight-green-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.blue",
    fallback: "Blue background",
    value: "var(--tt-color-highlight-blue)",
    border: "var(--tt-color-highlight-blue-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.purple",
    fallback: "Purple background",
    value: "var(--tt-color-highlight-purple)",
    border: "var(--tt-color-highlight-purple-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.pink",
    fallback: "Pink background",
    value: "var(--tt-color-highlight-pink)",
    border: "var(--tt-color-highlight-pink-contrast)",
  },
  {
    i18nKey: "tipTapEditor.toolbar.highlightColors.red",
    fallback: "Red background",
    value: "var(--tt-color-highlight-red)",
    border: "var(--tt-color-highlight-red-contrast)",
  },
];

/**
 * Возвращает локализованный массив цветов хайлайта.
 * @param t i18n TFunction
 */
function localizeHighlightColors(
  t: TFunction<"translation", undefined>,
): HighlightColor[] {
  return HIGHLIGHT_COLOR_PRESETS.map((c) => ({
    label: t(c.i18nKey, { defaultValue: c.fallback }),
    value: c.value,
    border: c.border,
  }));
}

/**
 * Подбирает из локализованного набора только нужные значения value.
 * @param values список value (CSS переменные) которые нужны в палитре
 * @param t i18n TFunction
 */
export function pickHighlightColorsByValue(
  values: string[],
  t: TFunction<"translation", undefined>,
): HighlightColor[] {
  const all = localizeHighlightColors(t);
  const map = new Map(all.map((c) => [c.value, c]));
  return values.map((v) => map.get(v)).filter((c): c is HighlightColor => !!c);
}

/**
 * Конфигурация для подсветки цвета.
 */
export interface UseColorHighlightConfig {
  /**
   * Экземпляр редактора.
   */
  editor?: Editor | null;
  /**
   * Цвет, который применяем при переключении подсветки.
   */
  highlightColor?: string;
  /**
   * Локализованный лейбл (можно не передавать — будет взят из i18n в месте использования).
   */
  label?: string;
  /**
   * Прятать ли кнопку, если подсветка недоступна.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Коллбек при применении подсветки.
   */
  onApplied?: ({ color, label }: { color: string; label: string }) => void;
}

/**
 * Проверка доступности хайлайта.
 */
export function canColorHighlight(editor: Editor | null): boolean {
  if (!editor?.isEditable) return false;
  if (
    !isMarkInSchema("highlight", editor) ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false;
  return editor.can().setMark("highlight");
}

/**
 * Активен ли хайлайт (в целом или для конкретного цвета).
 */
export function isColorHighlightActive(
  editor: Editor | null,
  highlightColor?: string,
): boolean {
  if (!editor?.isEditable) return false;
  return highlightColor
    ? editor.isActive("highlight", { color: highlightColor })
    : editor.isActive("highlight");
}

/**
 * Снять хайлайт.
 */
export function removeHighlight(editor: Editor | null): boolean {
  if (!editor?.isEditable) return false;
  if (!canColorHighlight(editor)) return false;
  return editor.chain().focus().unsetMark("highlight").run();
}

/**
 * Нужна ли кнопка хайлайта в текущем состоянии.
 */
export function shouldShowButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
}): boolean {
  const { editor, hideWhenUnavailable } = props;
  if (!editor?.isEditable) return false;
  if (!isMarkInSchema("highlight", editor)) return false;

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canColorHighlight(editor);
  }
  return true;
}

/**
 * Хук работы с подсветкой текста.
 * Лейблы и подсказки локализуются через i18n.
 */
export function useColorHighlight(config: UseColorHighlightConfig) {
  const {
    editor: providedEditor,
    label,
    highlightColor,
    hideWhenUnavailable = false,
    onApplied,
  } = config;

  const { t } = useTranslation();
  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsMobile();

  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const canColorHighlightState = canColorHighlight(editor);
  const isActive = isColorHighlightActive(editor, highlightColor);

  React.useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }));
    };

    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable]);

  const handleColorHighlight = React.useCallback(() => {
    if (!editor || !canColorHighlightState || !highlightColor) return false;

    // Лейбл берём из пропов или i18n (на случай вызова вне поповера)
    const appliedLabel =
      label ||
      t("tipTapEditor.toolbar.highlight", {
        defaultValue: "Highlight",
      });

    // Чистим storedMarks, чтобы корректно применить новый цвет
    if (editor.state.storedMarks) {
      const highlightMarkType = editor.schema.marks.highlight;
      if (highlightMarkType) {
        editor.view.dispatch(
          editor.state.tr.removeStoredMark(highlightMarkType),
        );
      }
    }

    setTimeout(() => {
      const success = editor
        .chain()
        .focus()
        .toggleMark("highlight", { color: highlightColor })
        .run();
      if (success) {
        onApplied?.({ color: highlightColor, label: appliedLabel });
      }
      return success;
    }, 0);

    return true;
  }, [canColorHighlightState, highlightColor, editor, label, t, onApplied]);

  const handleRemoveHighlight = React.useCallback(() => {
    const success = removeHighlight(editor);
    if (success) {
      onApplied?.({
        color: "",
        label: t("tipTapEditor.toolbar.removeHighlight", {
          defaultValue: "Remove highlight",
        }),
      });
    }
    return success;
  }, [editor, onApplied, t]);

  useHotkeys(
    COLOR_HIGHLIGHT_SHORTCUT_KEY,
    (event) => {
      event.preventDefault();
      handleColorHighlight();
    },
    {
      enabled: isVisible && canColorHighlightState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    },
  );

  return {
    isVisible,
    isActive,
    handleColorHighlight,
    handleRemoveHighlight,
    canColorHighlight: canColorHighlightState,
    // Кнопка и тултип — локализованные:
    label:
      label ||
      t("tipTapEditor.toolbar.highlight", {
        defaultValue: "Highlight",
      }),
    shortcutKeys: COLOR_HIGHLIGHT_SHORTCUT_KEY,
    Icon: HighlighterIcon,
  };
}
