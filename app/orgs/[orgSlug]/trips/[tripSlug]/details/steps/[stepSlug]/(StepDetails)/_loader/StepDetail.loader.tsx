import { Skeleton } from "@ui/skeleton";

export const StepDetailLoader = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-96 w-full" />
    </div>
  );
};
