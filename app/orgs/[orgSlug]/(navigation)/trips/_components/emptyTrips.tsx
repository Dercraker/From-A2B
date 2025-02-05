import { AddTripDialog } from "@/components/trips/addTripDialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type EmptyTripsProps = ComponentPropsWithoutRef<"div"> & {};

export const EmptyTrips = ({
  children,
  className,
  ...props
}: EmptyTripsProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-full w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <Typography variant="lead">No trips found</Typography>
        <AddTripDialog>
          <Button variant="invert">Create</Button>
        </AddTripDialog>
      </div>
    </div>
  );
};
