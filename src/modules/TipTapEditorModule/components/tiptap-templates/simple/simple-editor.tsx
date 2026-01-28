import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useTranslation } from "react-i18next";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/button";
import { Spacer } from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/modules/TipTapEditorModule/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { HorizontalRule } from "@/modules/TipTapEditorModule/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/modules/TipTapEditorModule/components/tiptap-ui/heading-dropdown-menu";
// import { ImageUploadButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/modules/TipTapEditorModule/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/blockquote-button";
// import { CodeBlockButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/modules/TipTapEditorModule/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/modules/TipTapEditorModule/components/tiptap-ui/link-popover";
import { MarkButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/modules/TipTapEditorModule/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/link-icon";
import { TrashIcon } from "@/modules/TipTapEditorModule/components/tiptap-icons/trash-icon";

// --- Hooks ---
import { useIsMobile } from "@/modules/TipTapEditorModule/hooks/use-mobile";
import { useWindowSize } from "@/modules/TipTapEditorModule/hooks/use-window-size";
import { useCursorVisibility } from "@/modules/TipTapEditorModule/hooks/use-cursor-visibility";

// --- Components ---
// import { ThemeToggle } from "@/modules/TipTapEditorModule/components/tiptap-templates/simple/theme-toggle";

// --- Styles ---
import "@/modules/TipTapEditorModule/components/tiptap-templates/simple/simple-editor.scss";

/**
 * Контент основной панели инструментов (desktop + mobile main).
 * ВАЖНО: ничего не удаляем из комментариев; «Очистить всё» добавлена справа от ThemeToggle.
 */
const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  onClearAll,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  onClearAll: () => void; // 👈 новый проп
  isMobile: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ToolbarGroup>
        <Button
          type="button"
          data-style="ghost"
          role="button"
          aria-label={t("tipTapEditor.toolbar.clearAll", {
            defaultValue: "Очистить всё",
          })}
          tooltip={t("tipTapEditor.toolbar.clearAll", {
            defaultValue: "Очистить всё",
          })}
          onClick={onClearAll}
        >
          <TrashIcon className="tiptap-button-icon" />
          <span className="tiptap-button-text">
            {t("tipTapEditor.toolbar.clearAll")}
          </span>
        </Button>
      </ToolbarGroup>

      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        {/* <CodeBlockButton /> */}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        {/* <MarkButton type="code" /> */}
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      {/* <ToolbarSeparator /> */}
      {/* TODO: Вернуть загрузку фото, когда будет готов бекенд */}
      {/* <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup> */}

      <Spacer />

      {/* {isMobile && <ToolbarSeparator />} */}
      {/* TODO: Вернуть, когда будет смена темы по всему приложению */}
      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

// 👇 Добавлено: пропсы для двухсторонней связи с формой
type SimpleEditorProps = {
  /** HTML-контент из формы (RHF Controller field.value) */
  value?: object | string;
  /** Колбэк для записи HTML обратно в форму (RHF Controller field.onChange) */
  onChange?: (html: string) => void;
  /** Отключение редактирования */
  disabled?: boolean;
};

/**
 * SimpleEditor — локализуемый редактор с панелью инструментов.
 * Добавлена кнопка «Очистить всё» для мгновенной очистки содержимого.
 */
export function SimpleEditor({ value, onChange, disabled }: SimpleEditorProps) {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const { t } = useTranslation();

  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": t("tipTapEditor.a11y.mainContentAria", {
          defaultValue: "Основная область ввода. Начните печатать.",
        }),
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      // TODO: Вернуть поддержку изображений после обновления backend-санитизации.
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    // Инициализация контента из формы (или интро, если пусто)
    content: value,

    // 👇 Каждое обновление отправляем обратно в форму
    onUpdate: (state) => {
      onChange?.(state.editor.getHTML());
    },

    // Редактор можно заблокировать снаружи
    editable: !disabled,
  });

  // 👇 Обработчик «Очистить всё»
  const handleClearAll = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().clearContent(true).run();
    onChange?.(""); // синхронизируем с формой
  }, [editor, onChange]);

  // Слежение за видимостью курсора (как и было)
  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // 👇 Если disabled меняется снаружи — обновляем редактор
  React.useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  // 👇 Если значение в форме сброшено/изменено (reset, setValue) — подтянуть его в редактор.
  // Важно: когда value === undefined, не трогаем (даём показать интро при первом монтировании).
  React.useEffect(() => {
    if (!editor) return;
    if (value === undefined) return;

    const current = editor.getHTML();
    const next = value;

    // Пустое значение из формы очищает редактор
    if (next === "" && current !== "") {
      editor.commands.clearContent(true);
      return;
    }

    // Непустое — заменяем, если отличается
    if (typeof next === "string" && next.length > 0 && next !== current) {
      editor.commands.setContent(next);
    }
  }, [editor, value]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              onClearAll={handleClearAll} // 👈 передаём обработчик
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
