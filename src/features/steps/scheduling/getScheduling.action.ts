"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetStepQuery } from "../get/getStep.query";

const GetSchedulingActionSchema = z.object({
  stepSlug: z.string(),
});

export const GetSchedulingAction = orgAction
  .schema(GetSchedulingActionSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    const step = await GetStepQuery({
      where: {
        slug: stepSlug,
      },
    });

    return step.schedulingNotes;
  });
