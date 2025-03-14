import { Skeleton } from "@ui/skeleton";

export const EmailFormLoader = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-12 w-96" />
      <Skeleton className="h-12 w-16" />
    </div>
  );
};
