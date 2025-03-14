import { GetStepBySlugQuery } from "@feat/steps/get/getStepBySlug.query";
import type { PageParams, StepPathParams } from "@type/next";
import { Card, CardContent } from "@ui/card";
import { ScheduleNotesMdxEditor } from "./_component/scheduleNotesMdxEditor";
import { ScheduleTasks } from "./_component/scheduleTasks";

import { combineWithParentMetadata } from "@lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "Scheduling",
  description: "Scheduling",
});

export default async function RoutePage({
  params,
}: PageParams<StepPathParams>) {
  const { stepSlug, tripSlug } = await params;
  const markdown = (
    await GetStepBySlugQuery({
      stepSlug,
      select: {
        schedulingNotes: true,
      },
    })
  ).schedulingNotes;

  return (
    <Card className="max-h-[calc(100vh-12rem)] overflow-y-auto pt-6">
      <CardContent className="flex flex-col gap-4">
        <ScheduleNotesMdxEditor markdown={markdown ?? undefined} />
        <ScheduleTasks stepSlug={stepSlug} tripSlug={tripSlug} />
      </CardContent>
    </Card>
  );
}
