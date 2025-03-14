import { Skeleton } from "@components/ui/skeleton";

export type StepCounterProps = {
  order?: number;
};

export const StepCounter = ({ order }: StepCounterProps) => {
  if (!order) return <Skeleton className="size-12" />;

  return (
    <div className="flex size-10 select-none items-center justify-center rounded-full border-4 border-solid border-primary ">
      {order}
    </div>
  );
};
