"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { UpdateSchedulingNoteByStepSlugQuery } from "../update/updateSchedulingNoteByStepSlug.query";

const UpdateSchedulingNoteActionSchema = z.object({
  stepSlug: z.string(),
  markdown: z.string(),
});

export const UpdateSchedulingNoteActionAction = orgAction
  .schema(UpdateSchedulingNoteActionSchema)
  .action(async ({ parsedInput: { markdown, stepSlug } }) =>
    UpdateSchedulingNoteByStepSlugQuery({ markdown, stepSlug }),
  );
