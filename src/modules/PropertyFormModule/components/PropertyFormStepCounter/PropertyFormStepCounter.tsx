import * as React from "react";
import { usePropertyFormStore } from "../../store";

/**
 * Индикатор прогресса пошаговой формы.
 * - Подсвечивает пройденные и текущий шаги цветом `customColors.primary`;
 * - Будущие шаги — `customColors.grey300`;
 * - Порядок шагов берётся из store.stepsOrder (единый источник правды).
 */
export const PropertyFormStepCounter: React.FC = () => {
  const stepsOrder = usePropertyFormStore((s) => s.stepsOrder);
  const currentIndex = usePropertyFormStore((s) => s.getCurrentStepIndex());

  const total = stepsOrder.length;

  return (
    <div
      className="flex items-center gap-4 py-2 md:py-0"
      aria-label={`Шаг ${currentIndex + 1} из ${total}`}
    >
      <div className="flex flex-1 items-center gap-2">
        {stepsOrder.map((item, idx) => {
          const isPassedOrCurrent = idx <= currentIndex;
          return (
            <div
              key={item}
              className={
                "h-1.5 flex-1 rounded-md transition-colors " +
                (isPassedOrCurrent ? "bg-primary" : "bg-grey-300")
              }
            />
          );
        })}
      </div>

      <span className="whitespace-nowrap text-body2 text-labels-secondary">
        {currentIndex + 1}/{total}
      </span>
    </div>
  );
};
