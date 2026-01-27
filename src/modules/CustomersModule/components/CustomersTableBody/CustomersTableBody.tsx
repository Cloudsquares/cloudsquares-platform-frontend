import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Customer,
  ServiceTypeDisplayText,
} from "../../../../shared/interfaces/Customer";
import { displayUserName } from "../../../../shared/utils";
import { Button } from "@/shared/components/ui/button";

interface CustomersTableBodyProps {
  data: Customer[];
}

export const CustomersTableBody = ({ data }: CustomersTableBodyProps) => {
  const { t } = useTranslation();

  const renderUserName = (user: Customer) => {
    const { first_name, last_name, middle_name } = user;
    return displayUserName({ first_name, last_name, middle_name }).shortName;
  };

  const handleClickButton = () => {
    toast.error("Показать модалку со списком объектов недвижимости");
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id} className="border-b border-grey-200">
          <td className="px-3 py-2 text-body2 text-foreground">{item.id}</td>
          <td className="px-3 py-2 text-body2 text-foreground">
            {renderUserName(item)}
          </td>
          <td className="px-3 py-2 text-body2 text-foreground">{item.phone}</td>
          <td className="px-3 py-2 text-body2 text-foreground">{item.email}</td>
          <td className="px-3 py-2 text-body2 text-foreground">
            {ServiceTypeDisplayText[item.service_type]}
          </td>
          <td className="px-3 py-2 text-body2 text-foreground">
            {item.description}
          </td>
          <td className="px-3 py-2 text-body2 text-foreground">
            <Button type="button" size="sm" onClick={handleClickButton}>
              {t("customers.table.body.show_relations")}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
