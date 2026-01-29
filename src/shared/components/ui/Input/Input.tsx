import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-3 py-1 text-body3",
        md: "h-10 px-4 py-2 text-body2",
        lg: "h-12 px-5 py-2.5 text-body2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Пропсы для компонента `Input`.
 */
export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Флаг состояния ошибки */
  hasError?: boolean;
}

/**
 * Базовый UI-инпут с поддержкой размеров и состояния ошибки.
 *
 * @param {InputProps} props Пропсы компонента
 * @returns React-компонент инпута
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, size, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        inputVariants({ size }),
        hasError && "border-error focus-visible:ring-error",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";
