import * as React from "react";

import { cn } from "@/shared/utils";

const baseInputStyles =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-body3 text-foreground placeholder:text-labels-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        baseInputStyles,
        hasError && "border-error focus-visible:ring-error",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";
