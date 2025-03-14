import { Skeleton } from "@ui/skeleton";

export default async function RouteLoading() {
  return (
    <div className="flex w-full flex-wrap gap-4 max-lg:flex-col max-lg:items-center">
      <Skeleton className="h-96 w-[422px]" />
    </div>
  );
}
