import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui";
import { useIsMobile } from "@/shared/components/Pagination/hooks/useIsMobile";
import { buildPaginationItems } from "@/shared/components/Pagination/utils/buildPaginationItems";
import { cn } from "@/shared/utils";

/**
 * Пропсы для компонента `Pagination`.
 */
export interface PaginationProps {
  page: number;
  rowsPerPage: number;
  total: number;
  rowsPerPageOptions: number[];
  labelRowsPerPage?: string;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

/**
 * Унифицированная пагинация для списков и таблиц.
 *
 * @param {PaginationProps} props Пропсы компонента
 * @returns React-компонент пагинации
 */
export const Pagination = ({
  page,
  rowsPerPage,
  total,
  rowsPerPageOptions,
  labelRowsPerPage = "На странице",
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  const isMobile = useIsMobile();

  if (total === 0) return null;

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(Math.max(page, 0), totalPages - 1);
  const siblingCount = isMobile ? 0 : 1;
  const paginationItems = buildPaginationItems(
    totalPages,
    currentPage,
    siblingCount,
    1,
  );

  /**
   * Обновляет страницу с учётом допустимых границ.
   *
   * @param {number} nextPage Новая страница (0-based)
   */
  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || nextPage >= totalPages) return;
    onPageChange(nextPage);
  };

  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex w-full items-center justify-between gap-2 text-body3 text-muted-foreground sm:w-auto">
        <span>{labelRowsPerPage}</span>
        <select
          className="h-8 rounded-md border border-input bg-background px-2 text-body3 text-foreground"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <nav
        aria-label="Пагинация"
        className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end"
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {paginationItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-body3 text-muted-foreground"
                >
                  …
                </span>
              );
            }

            const pageIndex = item - 1;
            const isActive = pageIndex === currentPage;

            return (
              <Button
                key={item}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(pageIndex)}
                aria-current={isActive ? "page" : undefined}
                className={cn(isActive && "text-foreground")}
              >
                {item}
              </Button>
            );
          })}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          aria-label="Следующая страница"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};
