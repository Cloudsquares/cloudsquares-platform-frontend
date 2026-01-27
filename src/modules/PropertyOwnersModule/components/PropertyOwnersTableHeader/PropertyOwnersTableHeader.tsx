import { CustomTableCell } from "../../../../shared/components/CustomTabCell";

/**
 * Заголовок таблицы База собственников.
 *
 * - Определяет структуру заголовков таблицы.
 * - Использует `CustomTableCell` для форматирования текста.
 *
 * @returns React-компонент заголовка таблицы.
 */
export const PropertyOwnersTableHeader = () => {
  return (
    <thead className="bg-grey-100">
      <tr>
        <CustomTableCell text="№" fw={600} as="th" />
        <CustomTableCell text="ФИО" fw={600} as="th" />
        <CustomTableCell text="Телефон" fw={600} as="th" />
        <CustomTableCell text="Почта" fw={600} as="th" />
        <CustomTableCell text="Роль" fw={600} as="th" />
        <CustomTableCell text="Комментарий" fw={600} as="th" />
        <CustomTableCell text="Количество объектов" fw={600} as="th" />
      </tr>
    </thead>
  );
};
