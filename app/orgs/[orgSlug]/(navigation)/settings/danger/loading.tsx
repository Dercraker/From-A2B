import { Skeleton } from "@ui/skeleton";

const RouteLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-44 w-full" />
    </div>
  );
};

export default RouteLoading;
