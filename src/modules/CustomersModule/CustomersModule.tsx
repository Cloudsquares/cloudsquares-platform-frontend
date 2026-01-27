import React from "react";

import { CustomersTable } from "./components/CustomersTable";
import { useTablePagination } from "../../shared/hooks";
import { BasicPageHeader } from "../../shared/components/Mobile/BasicPageHeader";
import { Customer, ServiceType } from "../../shared/interfaces/Customer";

const tempData: Customer[] = [
  {
    id: "1",
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
    phone: "+79111234567",
    email: "client-mail@mail.com",
    service_type: ServiceType.search,
    linked_objects: [],
    description: "Комментарий от сотрудника",
  },
  {
    id: "2",
    first_name: "Василий",
    last_name: "Иванов",
    middle_name: "Иванович",
    phone: "+79111234567",
    email: "client-mail@mail.com",
    service_type: ServiceType.sell,
    linked_objects: [],
    description: "Комментарий от сотрудника",
  },
  {
    id: "3",
    first_name: "Федор",
    last_name: "Иванов",
    middle_name: "Иванович",
    phone: "+79111234567",
    email: "client-mail@mail.com",
    service_type: ServiceType.rent,
    linked_objects: [],
    description: "Комментарий от сотрудника",
  },
  {
    id: "4",
    first_name: "Николай",
    last_name: "Иванов",
    middle_name: "Иванович",
    phone: "+79111234567",
    email: "client-mail@mail.com",
    service_type: ServiceType.lease,
    linked_objects: [],
    description: "Комментарий от сотрудника",
  },
];

const tempResponse = {
  totalPages: 1,
  data: tempData,
};

export const CustomersModule = () => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTablePagination(
    15,
    "allCustomersTable",
  );
  return (
    <React.Fragment>
      <BasicPageHeader title="База клиентов" shownBackArrowButton />
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid gap-4 py-4">
          <h1 className="text-h4 text-foreground">База клиентов</h1>
          <CustomersTable
            data={tempResponse.data}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            totalPages={tempResponse.totalPages}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
