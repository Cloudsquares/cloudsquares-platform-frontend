import { Skeleton } from "@/shared/components/ui/skeleton";

export const PropertyCategoriesListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
          key={index}
        >
          <Skeleton className="h-12 w-12" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      ))}
    </>
  );
};
