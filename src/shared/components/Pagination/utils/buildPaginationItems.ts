/**
 * Элемент для отображения пагинации.
 */
export type PaginationItem = number | "ellipsis";

/**
 * Возвращает массив чисел и разделителей для пагинации.
 *
 * @param {number} totalPages Общее количество страниц
 * @param {number} currentPage Текущая страница (0-based)
 * @param {number} siblingCount Количество соседних страниц
 * @param {number} boundaryCount Количество крайних страниц
 * @returns {PaginationItem[]} Массив элементов пагинации
 */
export const buildPaginationItems = (
  totalPages: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItem[] => {
  const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const currentPageNumber = currentPage + 1;
  const leftSiblingIndex = Math.max(
    currentPageNumber - siblingCount,
    boundaryCount + 1,
  );
  const rightSiblingIndex = Math.min(
    currentPageNumber + siblingCount,
    totalPages - boundaryCount,
  );

  const showLeftEllipsis = leftSiblingIndex > boundaryCount + 1;
  const showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount;

  const leftRange = Array.from(
    { length: boundaryCount },
    (_, index) => index + 1,
  );
  const rightRange = Array.from(
    { length: boundaryCount },
    (_, index) => totalPages - boundaryCount + index + 1,
  );

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = boundaryCount + siblingCount * 2 + 1;
    const leftItems = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1,
    );

    return [...leftItems, "ellipsis", ...rightRange];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = boundaryCount + siblingCount * 2 + 1;
    const rightItems = Array.from(
      { length: rightItemCount },
      (_, index) => totalPages - rightItemCount + index + 1,
    );

    return [...leftRange, "ellipsis", ...rightItems];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index,
  );

  return [...leftRange, "ellipsis", ...middleRange, "ellipsis", ...rightRange];
};
