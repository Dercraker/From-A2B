import { SectionLayout } from "@/components/layout/SectionLayout";
import { Typography } from "@/components/ui/typography";
import { TimelineAnimation } from "./TimelineAnnimation";

export const StepSection = () => {
  return (
    <SectionLayout size="lg">
      <Typography variant="h1" className="text-primary">
        Create your trip easily!
      </Typography>
      <Typography className="text-xl text-primary  ">
        By using our web application, you can plan and customize your trip
        easily in a few steps.
      </Typography>
      <TimelineAnimation />
    </SectionLayout>
  );
};
