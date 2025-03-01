import { GetStepBySlugQuery } from "@feat/steps/get/getStepBySlug.query";
import { Card, CardContent } from "@ui/card";
import { ScheduleNotesMdxEditor } from "./scheduleNotesMdxEditor";

export type SchedulingCardProps = {
  stepSlug: string;
};

export const SchedulingCard = async ({ stepSlug }: SchedulingCardProps) => {
  const markdown = (await GetStepBySlugQuery({ stepSlug })).data
    ?.schedulingNotes;

  return (
    <Card className="pt-6">
      <CardContent>
        <ScheduleNotesMdxEditor markdown={markdown ?? undefined} />
      </CardContent>
    </Card>
  );
};
