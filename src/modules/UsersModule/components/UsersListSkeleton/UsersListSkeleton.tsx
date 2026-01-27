import { Skeleton } from "@/shared/components/ui/skeleton";

export const UsersListSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Skeleton key={item} className="h-[150px] w-full" />
      ))}
    </div>
  );
};
