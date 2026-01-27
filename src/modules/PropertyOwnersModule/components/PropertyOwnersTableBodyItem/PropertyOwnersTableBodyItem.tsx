import { useNavigate } from "react-router-dom";

import {
  DisplayTextPropertyOwnerRole,
  PropertyOwner,
} from "../../../../shared/interfaces/PropertyOwner";
import { CustomTableCell } from "../../../../shared/components/CustomTabCell";
import { displayUserName } from "../../../../shared/utils";

/**
 * Пропсы для компонента `PropertyOwnersTableBodyItem`.
 */
interface PropertyOwnersTableBodyItemProps {
  /** Данные одного собственника */
  owner: PropertyOwner;

  /** Порядковый номер строки в таблице */
  number: number;
}

/**
 * Компонент строки таблицы База собственников.
 *
 * - Отображает основные данные собственника: телефон, ФИО, статус, комментарий сотрудника, количество связанных объектов.
 * - При клике на строку переходит на страницу деталей собственника, передавая данные через `location.state`.
 *
 * @param {PropertyOwnersTableBodyItemProps} props Пропсы компонента.
 * @returns React-компонент строки таблицы.
 */
export const PropertyOwnersTableBodyItem = ({
  owner,
  number,
}: PropertyOwnersTableBodyItemProps) => {
  const navigate = useNavigate();
  const { first_name, last_name, middle_name } = owner;
  const { shortName } = displayUserName({ first_name, last_name, middle_name });

  return (
    <tr
      onClick={() =>
        navigate("/properties/owners/" + owner.id, {
          state: { ownerDetails: owner },
        })
      }
      className="cursor-pointer transition-colors hover:bg-primary/10"
    >
      <CustomTableCell text={number.toString()} fw={400} />
      <CustomTableCell text={shortName} fw={400} />
      <CustomTableCell text={owner.phone} fw={400} />
      <CustomTableCell text={owner.email || "—"} fw={400} />
      <CustomTableCell
        text={DisplayTextPropertyOwnerRole[owner.role]}
        fw={400}
      />
      <CustomTableCell text={owner.notes} fw={400} />
      <CustomTableCell text={"???"} fw={400} />
    </tr>
  );
};
