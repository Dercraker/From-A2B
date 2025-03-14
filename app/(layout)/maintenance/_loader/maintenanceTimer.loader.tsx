import { Skeleton } from "@ui/skeleton";

export const MaintenanceTimerLoader = () => {
  return (
    <div className="m-6 flex justify-center gap-4 max-sm:flex-wrap">
      <div className="flex gap-4">
        <Skeleton className="size-24" />
        <Skeleton className="size-24" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="size-24" />
        <Skeleton className="size-24" />
      </div>
    </div>
  );
};
