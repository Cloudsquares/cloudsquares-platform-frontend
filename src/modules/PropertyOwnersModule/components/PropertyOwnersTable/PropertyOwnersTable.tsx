import React from "react";
import { useTablePagination } from "../../../../shared/hooks";
import { PropertyOwnersTableHeader } from "../PropertyOwnersTableHeader";
import { PropertyOwnersTableBodyItem } from "../PropertyOwnersTableBodyItem";
import { AxiosErrorAlertMessage } from "../../../../shared/components/AxiosErrorAlertMessage";
import { useGetAllPropertyOwnersQuery } from "../../hooks";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { TablePagination } from "@/shared/components/ui/table-pagination";

export const PropertyOwnersTable = () => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTablePagination(
    15,
    "allPropertiesTable",
  );

  const {
    data: owners,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAllPropertyOwnersQuery({
    per_page: rowsPerPage,
    page: page + 1,
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
        <div className="flex w-full items-center justify-center bg-white p-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
        </div>
      )}
      {owners?.data.length === 0 && (
        <Alert variant="info">
          <AlertDescription>
            По заданным фильтрам заявок не найдено.
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
