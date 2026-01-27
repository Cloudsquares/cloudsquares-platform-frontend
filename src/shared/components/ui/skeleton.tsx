import * as React from "react";

import { cn } from "@/shared/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-grey-200", className)}
      {...props}
    />
  );
};
