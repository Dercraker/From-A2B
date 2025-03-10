import { LINKS } from "@feat/navigation/Links";
import { Typography } from "@ui/typography";
import {
  Construction,
  Hammer,
  History,
  Home,
  PartyPopper,
  Plane,
  SquareChevronLeft,
} from "lucide-react";
import type { Step, Tour } from "nextstepjs";
import { SiteConfig } from "site-config";
import { z } from "zod";

export const NEXT_STEP_TOURS = {
  OnBoardingTour: [
    {
      icon: <PartyPopper />,
      title: `Welcome on ${SiteConfig.title}`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            We're going to take you through several different steps, so that you
            can discover how {SiteConfig.title} works.
          </Typography>
        </div>
      ),
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    {
      icon: <Home />,
      title: "Your dashboard",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can get information about your travels
          </Typography>
        </div>
      ),
      selector: "#OnboardingTour-Step1",
      side: "bottom",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    {
      icon: <SquareChevronLeft />,
      title: "Menu",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Use this menu to access the most important pages
          </Typography>
        </div>
      ),
      selector: "#OnboardingTour-Step2",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: -8,
      pointerRadius: 8,
      nextRoute: LINKS.Onboarding.Trips.href({}),
    },
    {
      icon: <Plane />,
      title: "Trips page",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the Trips button to navigate to your trips
          </Typography>
          <Typography variant="small">
            On this page you can add new trips, edit existing ones and delete
            them
          </Typography>
          <Typography variant="small" className="italic">
            Only trips with departure dates in the present/future are listed
            here
          </Typography>
        </div>
      ),
      side: "bottom-left",
      selector: "#OnboardingTour-Step3",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
      prevRoute: LINKS.Organization.Middleware.href({}),
      nextRoute: LINKS.Onboarding.History.href({}),
    },
    {
      icon: <History />,
      title: "Trips History",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the History button to navigate to your trips history
          </Typography>
          <Typography variant="small">
            On this page you can view and manage your trips history
          </Typography>
          <Typography variant="small" className="italic">
            Only trips with departure dates in the past are listed here
          </Typography>
        </div>
      ),
      side: "bottom-left",
      selector: "#OnboardingTour-Step4",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
      prevRoute: LINKS.Onboarding.Trips.href({}),
    },
    {
      icon: <Construction />,
      title: "No trips history",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            You have no trips history yet.
          </Typography>
          <Typography variant="small">
            Let's create a first trip. To do so, click on this button to return
            to the list of trips
          </Typography>
        </div>
      ),
      side: "bottom",
      selector: "#OnboardingTour-Step5",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
      nextRoute: LINKS.Onboarding.Trips.href({}),
    },
    {
      icon: <Hammer />,
      title: "Start creating a new trip",
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the "New trip" button to create a new trip
          </Typography>
        </div>
      ),
      showControls: false,
      blockKeyboardControl: true,
      showSkip: true,
      side: "bottom",
      selector: "#OnboardingTour-Step6",
      pointerPadding: 16,
      pointerRadius: 8,
      prevRoute: LINKS.Onboarding.History.href({}),
    },
  ],
  SecondTour: [
    {
      icon: <>🚀</>,
      title: "Second tour, Step 1",
      content: <>Second tour, first step!</>,
      selector: "#nextstep-step1",
      side: "bottom",
      showControls: true,
      showSkip: true,
      pointerPadding: 10,
      pointerRadius: 10,
      nextRoute: "/foo",
      prevRoute: "/bar",
    },
  ],
} satisfies Record<string, Step[]>;

export const TourNameEnum = z.enum(
  Object.keys(NEXT_STEP_TOURS) as [
    keyof typeof NEXT_STEP_TOURS,
    ...(keyof typeof NEXT_STEP_TOURS)[],
  ],
);
export type TourName = z.infer<typeof TourNameEnum>;

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
    // phCapture("TourStart", { tourName });
  },
  onStepChange: (step: number, tourName: string | null) => {
    // phCapture("TourStepViewed", {
    //   tourName,
    //   step,
    // });
  },
  onComplete: (tourName: string | null) => {
    // phCapture("TourComplete", { tourName });
  },
  onSkip: (step: number, tourName: string | null) => {
    // phCapture("TourSkipped", { tourName, step });
  },
};
