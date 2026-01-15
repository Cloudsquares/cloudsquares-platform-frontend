import * as React from "react";

import { cn } from "@/shared/utils";

const baseTextareaStyles =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-body3 text-foreground placeholder:text-labels-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => (
    <textarea
      className={cn(
        baseTextareaStyles,
        hasError && "border-error focus-visible:ring-error",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
