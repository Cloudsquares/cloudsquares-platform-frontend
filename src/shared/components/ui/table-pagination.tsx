import * as React from "react";

import { cn } from "@/shared/utils";
import { Button } from "@/shared/components/ui/button";

interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  count: number;
  rowsPerPageOptions: number[];
  labelRowsPerPage?: string;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export const TablePagination = ({
  page,
  rowsPerPage,
  count,
  rowsPerPageOptions,
  labelRowsPerPage = "Строк на странице",
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
  const isFirstPage = page <= 0;
  const isLastPage = page >= totalPages - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-border bg-card px-4 py-3">
      <label className="flex items-center gap-2 text-body3 text-labels-secondary">
        {labelRowsPerPage}
        <select
          className={cn(
            "h-9 rounded-md border border-input bg-background px-2 text-body3 text-foreground",
          )}
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
      <div className="flex items-center gap-3">
        <span className="text-body3 text-labels-secondary">
          {page + 1} / {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={isFirstPage}
          >
            Назад
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={isLastPage}
          >
            Вперёд
          </Button>
        </div>
      </div>
    </div>
  );
};
