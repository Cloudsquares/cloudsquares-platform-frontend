import { describe, expect, it } from "vitest";

import { buildPaginationItems } from "@/shared/components/Pagination/utils/buildPaginationItems";

describe("buildPaginationItems", () => {
  it("возвращает все страницы, если их мало", () => {
    const items = buildPaginationItems(3, 0, 1, 1);

    expect(items).toEqual([1, 2, 3]);
  });

  it("добавляет многоточия при большом количестве страниц", () => {
    const items = buildPaginationItems(20, 9, 1, 1);

    expect(items).toContain("ellipsis");
    expect(items[0]).toBe(1);
    expect(items[items.length - 1]).toBe(20);
  });
});
