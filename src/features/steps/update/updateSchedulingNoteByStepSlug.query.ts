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

  return step;
};
