"use client";

import { buttonVariants } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { LINKS } from "@feat/navigation/Links";
import {
  getTourStepIndex,
  getTourStepSelector,
  TourNames,
} from "@lib/onBoarding/nextStepTours";
import Link from "next/link";
import { useNextStep } from "nextstepjs";

export type TravelHistoryEmptyProps = {
  orgSlug: string;
};

export const TravelHistoryEmpty = ({ orgSlug }: TravelHistoryEmptyProps) => {
  const { setCurrentStep, currentTour } = useNextStep();
  return (
    <div className="flex w-full select-none items-center justify-center gap-2">
      <Typography variant="h2" className="text-muted-foreground">
        No trips found
      </Typography>
      <Link
        href={LINKS.Organization.Trips.href({ orgSlug })}
        className={buttonVariants({ variant: "outline" })}
        id={getTourStepSelector(TourNames.OnBoardingTour, "EmptyTrips")}
        onClick={() =>
          currentTour
            ? setCurrentStep(
                getTourStepIndex(TourNames.OnBoardingTour, "NewTrip"),
                500,
              )
            : null
        }
      >
        Go to trips
      </Link>
    </div>
  );
};
