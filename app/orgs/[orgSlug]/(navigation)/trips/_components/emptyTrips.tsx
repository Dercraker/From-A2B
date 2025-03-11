"use client";

import { AddTripDialog } from "@components/trips/addTripDialog";
import { Button } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import { cn } from "@lib/utils";
import { useNextStep } from "nextstepjs";
import type { ComponentPropsWithoutRef } from "react";

export type EmptyTripsProps = ComponentPropsWithoutRef<"div"> & {};

export const EmptyTrips = ({
  children,
  className,
  ...props
}: EmptyTripsProps) => {
  const { closeNextStep, currentTour } = useNextStep();
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
          <Button
            variant="invert"
            id={getTourStepSelector(TourNames.OnBoardingTour, "NewTrip")}
            onClick={() => (currentTour ? closeNextStep() : null)}
          >
            Create
          </Button>
        </AddTripDialog>
      </div>
    </div>
  );
};
