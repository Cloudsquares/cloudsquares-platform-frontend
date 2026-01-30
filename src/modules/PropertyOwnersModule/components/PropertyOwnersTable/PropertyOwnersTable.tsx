import React from "react";

import { PropertyOwnersTableBodyItem } from "@/modules/PropertyOwnersModule/components/PropertyOwnersTableBodyItem";
import { PropertyOwnersTableHeader } from "@/modules/PropertyOwnersModule/components/PropertyOwnersTableHeader";
import { useGetAllPropertyOwnersQuery } from "@/modules/PropertyOwnersModule/hooks";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import {
  Alert,
  AlertDescription,
  TablePagination,
} from "@/shared/components/ui";
import { useSearchQueryParam, useTablePagination } from "@/shared/hooks";

interface PropertyOwnersTableProps {
  /** Идентификатор объекта недвижимости */
  propertyId: string;
}

export const PropertyOwnersTable = ({
  propertyId,
}: PropertyOwnersTableProps) => {
  const { query } = useSearchQueryParam();
  const hasSearchQuery = query.trim().length > 0;
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTablePagination(
    15,
    "allPropertiesTable",
  );

  React.useEffect(() => {
    setPage(0);
  }, [propertyId, query, setPage]);

  const {
    data: owners,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAllPropertyOwnersQuery({
    property_id: propertyId,
    per_page: rowsPerPage,
    page: page + 1,
    q: query || undefined,
  });

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
  };
  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="min-w-full text-left">
          <PropertyOwnersTableHeader />
          <tbody>
            {isSuccess &&
              owners.data.map((owner, index) => (
                <PropertyOwnersTableBodyItem
                  key={owner.id}
                  owner={owner}
                  number={index + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
      {isError && error && <AxiosErrorAlertMessage error={error} />}
      {isLoading && (
        <div className="flex w-full items-center justify-center bg-background p-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}
      {owners?.data.length === 0 && (
        <Alert variant="info">
          <AlertDescription>
            {hasSearchQuery
              ? "По заданному поиску ничего не найдено."
              : "Собственники не найдены."}
          </AlertDescription>
        </Alert>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 15, 30]}
        count={(owners?.pages || 1) * rowsPerPage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Заявок на странице"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};
