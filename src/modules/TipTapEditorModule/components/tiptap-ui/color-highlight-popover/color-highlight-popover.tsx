import * as React from "react";
import { type Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";

// --- Hooks ---
import { useMenuNavigation } from "@/modules/TipTapEditorModule/hooks/use-menu-navigation";
import { useIsMobile } from "@/modules/TipTapEditorModule/hooks/use-mobile";
import { useTiptapEditor } from "@/modules/TipTapEditorModule/hooks/use-tiptap-editor";

// --- Icons ---
import { BanIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/ban-icon";
import { HighlighterIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/highlighter-icon";

// --- UI Primitives ---
import type { ButtonProps } from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/button";
import {
  Button,
  ButtonGroup,
} from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/popover";
import { Separator } from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/separator";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/card";

// --- Tiptap UI ---
import type {
  HighlightColor,
  UseColorHighlightConfig,
} from "@/modules/TipTapEditorModule/components/tiptap-ui/color-highlight-button";
import {
  ColorHighlightButton,
  pickHighlightColorsByValue,
  useColorHighlight,
} from "@/modules/TipTapEditorModule/components/tiptap-ui/color-highlight-button";

/**
 * Пропсы контента поповера выбора цвета подсветки.
 */
export interface ColorHighlightPopoverContentProps {
  /**
   * Экземпляр Tiptap редактора.
   */
  editor?: Editor | null;
  /**
   * Необязательный список цветов подсветки.
   * Если не передан — используем дефолтный набор (локализованный).
   */
  colors?: HighlightColor[];
}

/**
 * Пропсы корневого компонента поповера.
 */
export interface ColorHighlightPopoverProps
  extends
    Omit<ButtonProps, "type">,
    Pick<
      UseColorHighlightConfig,
      "editor" | "hideWhenUnavailable" | "onApplied"
    > {
  /**
   * Необязательный список цветов подсветки.
   * Если не передан — используем дефолтный набор (локализованный).
   */
  colors?: HighlightColor[];
}

/**
 * Кнопка открытия поповера подсветки текста.
 * Лейблы/тултипы локализованы через i18n.
 */
export const ColorHighlightPopoverButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => {
  const { t } = useTranslation();
  const label = t("tipTapEditor.toolbar.highlight", {
    defaultValue: "Highlight",
  });

  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label={label}
      tooltip={label}
      ref={ref}
      {...props}
    >
      {children ?? <HighlighterIcon className="tiptap-button-icon" />}
    </Button>
  );
});
ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";

/**
 * Контент поповера выбора цвета подсветки (палитра + «Снять подсветку»).
 * Все подписи локализованы.
 */
export function ColorHighlightPopoverContent({
  editor,
  colors,
}: ColorHighlightPopoverContentProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Если цвета не пришли извне — берём дефолтный локализованный набор.
  const fallbackColors = pickHighlightColorsByValue(
    [
      "var(--tt-color-highlight-green)",
      "var(--tt-color-highlight-blue)",
      "var(--tt-color-highlight-red)",
      "var(--tt-color-highlight-purple)",
      "var(--tt-color-highlight-yellow)",
    ],
    t,
  );
  const palette: HighlightColor[] = colors ?? fallbackColors;

  // Текст для «Снять подсветку»
  const removeLabel = t("tipTapEditor.toolbar.removeHighlight", {
    defaultValue: "Remove highlight",
  });

  const { handleRemoveHighlight } = useColorHighlight({ editor });

  const menuItems = React.useMemo(
    () => [...palette, { label: removeLabel, value: "none", border: "" }],
    [palette, removeLabel],
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (!containerRef.current) return false;
      const highlightedElement = containerRef.current.querySelector(
        '[data-highlighted="true"]',
      ) as HTMLElement;
      if (highlightedElement) highlightedElement.click();
      if (item.value === "none") handleRemoveHighlight();
    },
    autoSelectFirstItem: false,
  });

  // aria-label для контейнера поповера
  const popoverAria = t("tipTapEditor.toolbar.highlightColors.title", {
    defaultValue: "Highlight colors",
  });

  // Шаблон aria-label для конкретной кнопки цвета
  const colorAria = (colorLabel: string) =>
    t("tipTapEditor.toolbar.highlightColors.itemAria", {
      color: colorLabel,
      defaultValue: `${colorLabel} highlight color`,
    });

  return (
    <Card
      ref={containerRef}
      tabIndex={0}
      aria-label={popoverAria}
      style={isMobile ? { boxShadow: "none", border: 0 } : {}}
    >
      <CardBody style={isMobile ? { padding: 0 } : {}}>
        <CardItemGroup orientation="horizontal">
          <ButtonGroup orientation="horizontal">
            {palette.map((color, index) => (
              <ColorHighlightButton
                key={color.value}
                editor={editor}
                highlightColor={color.value}
                tooltip={color.label}
                aria-label={colorAria(color.label)}
                tabIndex={index === selectedIndex ? 0 : -1}
                data-highlighted={selectedIndex === index}
              />
            ))}
          </ButtonGroup>
          <Separator />
          <ButtonGroup orientation="horizontal">
            <Button
              onClick={handleRemoveHighlight}
              aria-label={removeLabel}
              tooltip={removeLabel}
              tabIndex={selectedIndex === palette.length ? 0 : -1}
              type="button"
              role="menuitem"
              data-style="ghost"
              data-highlighted={selectedIndex === palette.length}
            >
              <BanIcon className="tiptap-button-icon" />
            </Button>
          </ButtonGroup>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
}

/**
 * Корневой поповер подсветки текста.
 * Берёт локализованные подписи из хука useColorHighlight и i18n.
 */
export function ColorHighlightPopover({
  editor: providedEditor,
  colors,
  hideWhenUnavailable = false,
  onApplied,
  ...props
}: ColorHighlightPopoverProps) {
  const { t } = useTranslation();
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);

  // Если цвета не пришли — соберём дефолт на основе i18n:
  const palette: HighlightColor[] =
    colors ??
    pickHighlightColorsByValue(
      [
        "var(--tt-color-highlight-green)",
        "var(--tt-color-highlight-blue)",
        "var(--tt-color-highlight-red)",
        "var(--tt-color-highlight-purple)",
        "var(--tt-color-highlight-yellow)",
      ],
      t,
    );

  const { isVisible, canColorHighlight, isActive, label, Icon } =
    useColorHighlight({
      editor,
      hideWhenUnavailable,
      onApplied,
    });

  if (!isVisible) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton
          disabled={!canColorHighlight}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={!canColorHighlight}
          aria-pressed={isActive}
          aria-label={label}
          tooltip={label}
          {...props}
        >
          <Icon className="tiptap-button-icon" />
        </ColorHighlightPopoverButton>
      </PopoverTrigger>
      <PopoverContent
        aria-label={t("tipTapEditor.toolbar.highlightColors.title", {
          defaultValue: "Highlight colors",
        })}
      >
        <ColorHighlightPopoverContent editor={editor} colors={palette} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorHighlightPopover;
