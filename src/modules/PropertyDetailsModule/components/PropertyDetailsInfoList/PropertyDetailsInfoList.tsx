import { PropertyDetailsInfoItem } from "../../../../shared/interfaces/PropertyDetails";

interface PropertyDetailsInfoListProps {
  data: PropertyDetailsInfoItem[];
}

export const PropertyDetailsInfoList = ({
  data,
}: PropertyDetailsInfoListProps) => {
  return (
    <ul className="flex flex-col gap-3">
      {data.map(({ label, value }, index) => (
        <li key={index} className="flex items-end gap-2">
          <span className="text-body1 text-foreground whitespace-nowrap">
            {label}
          </span>
          <span className="flex-1 border-b border-grey-200" />
          <span className="text-body1 text-foreground whitespace-nowrap">
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
};
