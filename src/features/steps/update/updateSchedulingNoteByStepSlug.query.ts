import { StepSchema } from "@generated/modelSchema";
import type { Prisma } from "@prisma/client";
import { EditStepQuery } from "./editStep.query";
type UpdateSchedulingNoteByStepSlugQueryProps = {
  stepSlug: string;
  markdown: string;
};

export const UpdateSchedulingNoteByStepSlugQuery = async ({
  markdown,
  stepSlug,
}: UpdateSchedulingNoteByStepSlugQueryProps) => {
  const step = await EditStepQuery({
    where: {
      slug: stepSlug,
    },
    step: { schedulingNotes: markdown },
  });

  return (await StepSchema.parseAsync(step)).schedulingNotes;
};

export type UpdateSchedulingNoteByStepSlugQuery = Prisma.PromiseReturnType<
  typeof UpdateSchedulingNoteByStepSlugQuery
>;
