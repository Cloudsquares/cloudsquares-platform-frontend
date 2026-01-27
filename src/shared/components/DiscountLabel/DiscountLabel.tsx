import { calculateDiscountInPercent } from "@/shared/utils";

interface DiscountLabelProps {
  price: number;
  discount: number;
}

export const DiscountLabel = ({ price, discount }: DiscountLabelProps) => {
  const hasDiscount = discount > 0;

  return (
    <div className={hasDiscount ? "flex items-center gap-2" : "hidden"}>
      <p className="text-subtitle1 text-success">
        -{calculateDiscountInPercent(price, discount)}%
      </p>
      <p className="text-subtitle1 text-grey-400 line-through">
        {price.toLocaleString("ru")} ₽
      </p>
    </div>
  );
};
