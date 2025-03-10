"use client";

import { TourNameEnum, type TourName } from "@lib/onBoarding/nextStepTours";
import { Button } from "@ui/button";
import { useNextStep } from "nextstepjs";

export const TourList = () => {
  const { startNextStep, currentTour } = useNextStep();

  const handleStartTour = (tourName: TourName) => {
    startNextStep(tourName);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => handleStartTour(TourNameEnum.Enum.OnBoardingTour)}>
        Start Tour
      </Button>
    </div>
  );
};
