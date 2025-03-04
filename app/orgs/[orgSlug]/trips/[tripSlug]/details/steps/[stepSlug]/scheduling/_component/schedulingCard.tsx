import { GetStepBySlugQuery } from "@feat/steps/get/getStepBySlug.query";
import { Card, CardContent } from "@ui/card";
import { ScheduleNotesMdxEditor } from "./scheduleNotesMdxEditor";
import { ScheduleTasks } from "./scheduleTasks";

export type SchedulingCardProps = {
  stepSlug: string;
};

export const SchedulingCard = async ({ stepSlug }: SchedulingCardProps) => {
  const markdown = (await GetStepBySlugQuery({ stepSlug })).data
    ?.schedulingNotes;

  return (
    <Card className="pt-6">
      <CardContent className="flex flex-col gap-4">
        <ScheduleNotesMdxEditor markdown={markdown ?? undefined} />
        <ScheduleTasks />
      </CardContent>
    </Card>
  );
};
