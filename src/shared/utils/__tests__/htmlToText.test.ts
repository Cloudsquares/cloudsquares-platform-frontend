import {
  htmlToPlainText,
  htmlToShortText,
  truncateText,
} from "@/shared/utils/htmlToText";
import { describe, expect, it } from "vitest";

describe("htmlToPlainText", () => {
  it("удаляет теги и сущности через DOMParser", () => {
    const html = "<p>Привет&nbsp;<strong>мир</strong></p>";
    expect(htmlToPlainText(html)).toBe("Привет мир");
  });

  it("использует фоллбэк без DOMParser", () => {
    const originalParser = globalThis.DOMParser;
    // @ts-expect-error intentional override for test
    globalThis.DOMParser = undefined;

    try {
      const html = "<p>Test&nbsp;<em>content</em></p>";
      expect(htmlToPlainText(html)).toBe("Test content");
    } finally {
      if (originalParser) {
        globalThis.DOMParser = originalParser;
      }
    }
  });
});

describe("truncateText", () => {
  it("возвращает текст без изменений, если он короче лимита", () => {
    expect(truncateText("короткий текст", 100)).toBe("короткий текст");
  });

  it("обрезает текст и старается не резать слова", () => {
    const text = "Это длинный текст, который следует обрезать аккуратно";
    expect(truncateText(text, 20)).toBe("Это длинный текст,...");
  });
});

describe("htmlToShortText", () => {
  it("комбинирует очистку и обрезку HTML", () => {
    const html = "<p>Первый абзац.</p><p>Второй абзац.</p>";
    expect(htmlToShortText(html, 12)).toBe("Первый абзац...");
  });
});
