import { useListTableHeaderColumns } from "../../hooks";

export const CustomersTableHead = () => {
  const headColumns = useListTableHeaderColumns();
  return (
    <thead className="bg-grey-100">
      <tr>
        {headColumns.map((column, index) => (
          <th
            key={index}
            className="px-3 py-2 text-left text-body2 font-semibold text-labels-secondary"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
