import { MdPhoto } from "react-icons/md";

import { Skeleton } from "@/shared/components/ui/skeleton";

export const PropertiesListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="grid gap-4 rounded-lg border border-grey-300 bg-white p-4 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-grey-300 bg-grey-100 text-grey-500">
            <MdPhoto size={64} />
          </div>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="space-y-3">
              <Skeleton className="h-7 w-1/2" />
              <Skeleton className="h-7 w-3/5" />
              <Skeleton className="h-7 w-2/5" />
              <Skeleton className="h-20 w-1/2" />
            </div>
            <div className="hidden flex-col items-end gap-2 sm:flex">
              <Skeleton className="h-7 w-4/5" />
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-3/5" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
