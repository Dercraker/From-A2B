import { LINKS } from "@feat/navigation/Links";
import { phCapture } from "@lib/postHog/eventCapture";
import { Separator } from "@ui/separator";
import { Typography } from "@ui/typography";
import {
  Calendar,
  Car,
  CircleCheckBig,
  Construction,
  Hammer,
  History,
  Home,
  ImagePlus,
  LandPlot,
  NotebookPen,
  PartyPopper,
  Plane,
  Plus,
  Send,
  SquareChevronLeft,
  TextCursor,
} from "lucide-react";
import type { Step, Tour } from "nextstepjs";
import { SiteConfig } from "site-config";
import { z } from "zod";

export const NEXT_STEP_TOURS = {
  OnBoardingTour: {
    Welcome: {
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
    Dashboard: {
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
    Menu: {
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
    Trips: {
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
    History: {
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
    EmptyTrips: {
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
    NewTrip: {
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
  },
  NewTripTour: {
    Title: {
      icon: <></>,
      title: `Title of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can add a title to your trip
          </Typography>
          <Typography variant="italic">
            you can edit it later in the trip settings
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step1",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Description: {
      icon: <></>,
      title: `Description of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            The description is optional, but it can be useful to add more
            information about the trip
          </Typography>
          <Typography variant="italic">
            When you will look back at your trips, the description will be
            displayed to help you remember what it was about
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step2",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDate: {
      icon: <></>,
      title: `Start date of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            The start date is the date when the trip will start
          </Typography>
          <Typography variant="small">
            Two modes are available to select the start date:
          </Typography>
          <Typography variant="small">- The calendar mode</Typography>
          <Typography variant="small">- The text input mode</Typography>
          <Typography variant="italic">
            You can edit it later in the trip settings
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step3",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDateCalendar: {
      icon: <Calendar />,
      title: `Start date with calendar`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the calendar mode, you can select the start date by clicking on
            the calendar icon
          </Typography>
          <Typography variant="small">
            Like a classical calendar, you can navigate through the days, months
            and years
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step3-1",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDateTextInput: {
      icon: <TextCursor />,
      title: `Start date with text input`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the text input mode, you can select the start date typing the
            wanted date in the input field then press enter
          </Typography>
          <Typography variant="small">
            Any format representing a date is accepted:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Typography variant="small">
              <code>2024-01-01</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>01/01/2024</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Tomorrow</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Next week</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 3 days</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>And more...</code>
            </Typography>
          </div>
        </div>
      ),
      selector: "#NewTripTour-Step3-2",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Picture: {
      icon: <ImagePlus />,
      title: `Picture of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            You can change the picture of your trip by clicking on the picture
          </Typography>
          <Typography variant="italic">The maximum size is 20MB</Typography>
        </div>
      ),
      selector: "#NewTripTour-Step4",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Submit: {
      icon: <Send />,
      title: `Create the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the "Create" button to create the trip, then you got
            redirected to the trip page
          </Typography>
          <Typography variant="italic">
            The button can be disabled if you haven't filled all the required
            fields
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step5",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
  },
  AddStepTour: {
    Place: {
      icon: <LandPlot />,
      title: `Place of the step`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            All steps are linked to a place. You can add a step by typing the
            name of the place. Then possible place will appear, you can select
            the good one by clicking on it.
          </Typography>
          <Typography variant="italic">
            You can edit the place later in the step details
          </Typography>
          <Typography variant="italic">
            The place for step is required, so you can't create a step without
            it
          </Typography>
        </div>
      ),
      selector: "#AddStepTour-Step1",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Title: {
      icon: <></>,
      title: `Step title`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            The title is required, it will be displayed in the step card
          </Typography>
          <Typography variant="italic">
            You can edit the title later in the step details
          </Typography>
        </div>
      ),
      selector: "#AddStepTour-Step2",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Description: {
      icon: <></>,
      title: `Step description`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            The description is optional, but it can be useful to add more
            information about the step
          </Typography>
          <Typography variant="italic">
            You can edit the description later in the step details
          </Typography>
        </div>
      ),
      selector: "#AddStepTour-Step3",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Dates: {
      icon: <Calendar />,
      title: `Start date with calendar`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Dates is when the step will start and end
          </Typography>
          <Typography variant="small">
            Two modes are available to select the start date:
          </Typography>
          <Typography variant="small">- The calendar mode</Typography>
          <Typography variant="small">- The text input mode</Typography>
          <Typography variant="italic">
            Dates are optional and you can edit it later in the step details
          </Typography>
        </div>
      ),
      selector: "#AddStepTour-Step4",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    DatesCalendar: {
      icon: <Calendar />,
      title: `Date with calendar`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the calendar mode, you can select the date by clicking on the
            calendar icon
          </Typography>
          <Typography variant="small">
            Like a classical calendar, you can navigate through the time, days,
            months and years
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step3-1", // NE PAS MODIFIER
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    DateTextInput: {
      icon: <TextCursor />,
      title: `Date with text input`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the text input mode, you can select the start date typing the
            wanted date-time in the input field then press enter
          </Typography>
          <Typography variant="small">
            Any format representing a date is accepted:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Typography variant="small">
              <code>2024-01-01</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>01/01/2024 at 10:00</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 20 minutes</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 48 hours</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Tomorrow</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Tomorrow at 10:00</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Next week</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 3 days</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 3 days at 10:00</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>And more...</code>
            </Typography>
          </div>
        </div>
      ),
      selector: "#NewTripTour-Step3-2", // NE PAS MODIFIER
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    TransportMode: {
      icon: <Car />,
      title: `Transport mode`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            You can select the transport mode by clicking on the transport mode
            icon
          </Typography>
          <Typography variant="small">
            It will be used to compute the itinerary to the the step
          </Typography>
          <Typography variant="small">
            The transport mode is required, so you can't create a step without
            it
          </Typography>
        </div>
      ),
      selector: "#AddStepTour-Step5",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Submit: {
      icon: <Send />,
      title: `Create the step`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the "Create" button to create the step
          </Typography>
          <Typography variant="italic">
            The button can be disabled if you haven't filled all the required
            fields
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step5",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
  },
  TripDetailsTour: {
    Title: {
      icon: <></>,
      title: `Title of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can edit the title of your trip
          </Typography>
        </div>
      ),
      selector: "#TripDetailsTour-Step1",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Description: {
      icon: <></>,
      title: `Description of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can edit or remove the description of your trip
          </Typography>
          <Typography variant="italic">
            The description is optional, but it can be useful to add more
            information about the trip
          </Typography>
        </div>
      ),
      selector: "#TripDetailsTour-Step2",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDate: {
      icon: <></>,
      title: `Start date of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            You can edit the start date of your trip
          </Typography>
          <Typography variant="small">
            Two modes are available to select the start date:
          </Typography>
          <Typography variant="small">- The calendar mode</Typography>
          <Typography variant="small">- The text input mode</Typography>
          <Typography variant="italic">
            You can edit it later in the trip settings
          </Typography>
        </div>
      ),
      selector: "#TripDetailsTour-Step3",
      side: "right",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDateCalendar: {
      icon: <Calendar />,
      title: `Start date with calendar`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the calendar mode, you can select the start date by clicking on
            the calendar icon
          </Typography>
          <Typography variant="small">
            Like a classical calendar, you can navigate through the days, months
            and years
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step3-1",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    StartDateTextInput: {
      icon: <TextCursor />,
      title: `Start date with text input`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the text input mode, you can select the start date typing the
            wanted date in the input field then press enter
          </Typography>
          <Typography variant="small">
            Any format representing a date is accepted:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Typography variant="small">
              <code>2024-01-01</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>01/01/2024</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Tomorrow</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Next week</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 3 days</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>And more...</code>
            </Typography>
          </div>
        </div>
      ),
      selector: "#NewTripTour-Step3-2",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Picture: {
      icon: <ImagePlus />,
      title: `Picture of the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            You can change the picture of your trip by clicking on the picture
          </Typography>
          <Typography variant="italic">The maximum size is 20MB</Typography>
        </div>
      ),
      selector: "#TripDetailsTour-Step4",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Submit: {
      icon: <Send />,
      title: `Save the trip`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Click on the "Save" button to save the trip
          </Typography>
          <Typography variant="italic">
            The button can be disabled if you haven't filled all the required
            fields or if the trip is not modified
          </Typography>
        </div>
      ),
      selector: "#TripDetailsTour-Step5",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
  },
  StepSchedulingTour: {
    Notes: {
      icon: <NotebookPen />,
      title: `Notes of the step`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can add notes about the step scheduling
          </Typography>
          <Typography variant="small">
            You can use markdown or the editor to format your notes
          </Typography>
          <Typography variant="small">
            All the notes are saved automatically
          </Typography>
        </div>
      ),
      selector: "#StepSchedulingTour-Notes",
      side: "bottom",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    Tasks: {
      icon: <CircleCheckBig />,
      title: `Tasks of the step`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">Here is your step todo-list</Typography>
          <Typography variant="small">
            You can add a task by clicking on the "New task" button
          </Typography>
          <Typography variant="small">
            To edit a task click on the task to open the editor
          </Typography>
          <Typography variant="small">
            To change the status of a task, use the status icon, at left of the
            task name
          </Typography>
        </div>
      ),
      selector: "#StepSchedulingTour-Tasks",
      side: "left",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
  },
  AddTaskTour: {
    TaskName: {
      icon: <></>,
      title: `Task name`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            Here you can edit the name of the task
          </Typography>
        </div>
      ),
      selector: "#AddTaskTour-TaskName",
      side: "bottom",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    DueDate: {
      icon: <Calendar />,
      title: `Due date`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            If the task is due, you can add a due date to it
          </Typography>
        </div>
      ),
      selector: "#AddTaskTour-DueDate",
      side: "left",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    DueCalendar: {
      icon: <Calendar />,
      title: `Due date with calendar`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the calendar mode, you can select the due date by clicking on the
            calendar icon
          </Typography>
          <Typography variant="small">
            Like a classical calendar, you can navigate through the days, months
            and years
          </Typography>
        </div>
      ),
      selector: "#NewTripTour-Step3-1",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    DueDateTextInput: {
      icon: <TextCursor />,
      title: `Due date with text input`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            In the text input mode, you can select the due date typing the
            wanted date in the input field then press enter
          </Typography>
          <Typography variant="small">
            Any format representing a date is accepted:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Typography variant="small">
              <code>2024-01-01</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>01/01/2024</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Tomorrow</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>Next week</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>In 3 days</code>
            </Typography>
            <Separator orientation="vertical" className="h-4 bg-primary" />
            <Typography variant="small">
              <code>And more...</code>
            </Typography>
          </div>
        </div>
      ),
      selector: "#NewTripTour-Step3-2",
      side: "top",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
    AddAnother: {
      icon: <Plus />,
      title: `Add another task`,
      content: (
        <div className="flex flex-col gap-2">
          <Typography variant="small">
            If you want to add immediately another task, click on the "Add
            another task" checkbox
          </Typography>
        </div>
      ),
      selector: "#AddTaskTour-AddAnother",
      side: "bottom",
      showControls: true,
      showSkip: true,
      pointerPadding: 16,
      pointerRadius: 8,
    },
  },
} satisfies Record<string, Record<string, Step>>;

//#region Utils
const TourNameEnum = z.enum(
  Object.keys(NEXT_STEP_TOURS) as [
    keyof typeof NEXT_STEP_TOURS,
    ...(keyof typeof NEXT_STEP_TOURS)[],
  ],
);
export const TourNames = TourNameEnum.Values;
export type TourName = z.infer<typeof TourNameEnum>;

export const getTours = () =>
  Object.entries(NEXT_STEP_TOURS).map(
    ([key, value]) =>
      ({
        tour: key,
        steps: Object.values(value),
      }) satisfies Tour,
  );

export const getTour = (tourName: TourName) => {
  const steps = NEXT_STEP_TOURS[tourName];

  return {
    tour: tourName,
    steps: Object.values(steps),
  } satisfies Tour;
};

export const getTourStep = <T extends TourName>(
  tourName: T,
  stepName: keyof (typeof NEXT_STEP_TOURS)[T],
) => NEXT_STEP_TOURS[tourName][stepName];

export const getTourStepFromIndex = (tourName: TourName, index: number) =>
  Object.values(NEXT_STEP_TOURS[tourName])[index];

export const getTourStepIndex = <T extends TourName>(
  tourName: T,
  stepName: keyof (typeof NEXT_STEP_TOURS)[T],
) => Object.keys(NEXT_STEP_TOURS[tourName]).indexOf(stepName as string);

export const getTourStepSelector = <T extends TourName>(
  tourName: T,
  stepName: keyof (typeof NEXT_STEP_TOURS)[T],
) =>
  (NEXT_STEP_TOURS[tourName][stepName] as Step).selector?.replace("#", "") ??
  "Unknown";

/**
 * Fonction pour suivre le progresse d'un tour
 */
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

//#endregion Utils
