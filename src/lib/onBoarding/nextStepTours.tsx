import { phCapture } from "@lib/postHog/eventCapture";
import type { Step, Tour } from "nextstepjs";
import { z } from "zod";

export const NEXT_STEP_TOURS = {
  FirstTour: [
    {
      icon: <>👋</>,
      title: "Tour 1, Step 1",
      content: <>First tour, first step</>,
      selector: "#tour1-step1",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 10,
      pointerRadius: 10,
      nextRoute: "/foo",
      prevRoute: "/bar",
    },
    {
      icon: <>🎉</>,
      title: "Tour 1, Step 2",
      content: <>First tour, second step</>,
      selector: "#tour1-step2",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 10,
      pointerRadius: 10,
    },
  ],
  SecondTour: [
    {
      icon: <>🚀</>,
      title: "Second tour, Step 1",
      content: <>Second tour, first step!</>,
      selector: "#nextstep-step1",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 10,
      pointerRadius: 10,
      nextRoute: "/foo",
      prevRoute: "/bar",
    },
  ],
} satisfies Record<string, Step[]>;

export const TourNameSchema = z.enum(
  Object.keys(NEXT_STEP_TOURS) as [
    keyof typeof NEXT_STEP_TOURS,
    ...(keyof typeof NEXT_STEP_TOURS)[],
  ],
);
export type TourName = z.infer<typeof TourNameSchema>;

export const getTours = () =>
  Object.entries(NEXT_STEP_TOURS).map(
    ([key, value]) =>
      ({
        tour: key,
        steps: value,
      }) satisfies Tour,
  );

export const getTour = (tourName: TourName) => {
  const steps = NEXT_STEP_TOURS[tourName];

  return {
    tour: tourName,
    steps,
  } satisfies Tour;
};

export const tourTrackProgress = {
  onStart: (tourName: string | null) => {
    phCapture("TourStart", { tourName });
  },
  onStepChange: (step: number, tourName: string | null) => {
    phCapture("TourStepViewed", {
      tourName,
      step,
    });
  },
  onComplete: (tourName: string | null) => {
    phCapture("TourComplete", { tourName });
  },
  onSkip: (step: number, tourName: string | null) => {
    phCapture("TourSkipped", { tourName, step });
  },
};
