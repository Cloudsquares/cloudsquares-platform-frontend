import React from "react";
import { Customer } from "../../../../shared/interfaces/Customer";
import { CustomersTableHead } from "../CustomersTableHead";
import { CustomersTableBody } from "../CustomersTableBody";
import { TablePagination } from "@/shared/components/ui/table-pagination";

interface CustomersTableProps {
  data: Customer[];
  page: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export const CustomersTable = ({
  data,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
}: CustomersTableProps) => {
  const handleChangePage = (newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="min-w-full text-left">
          <CustomersTableHead />
          <CustomersTableBody data={data} />
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 15, 30]}
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage=""
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};
