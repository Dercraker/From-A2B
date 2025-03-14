import { Skeleton } from "@ui/skeleton";

export default async function RouteLoading() {
  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
