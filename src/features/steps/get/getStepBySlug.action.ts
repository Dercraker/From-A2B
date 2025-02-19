"use server";

import { ActionError, orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetStepBySlugQuery } from "./getStepBySlug.query";

const GetStepBySlugSchema = z.object({
  stepSlug: z.string(),
});

export const GetStepBySlugAction = orgAction
  .schema(GetStepBySlugSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    const step = await GetStepBySlugQuery({ stepSlug });

    if (!step.success)
      throw new ActionError("Failed to fetch step. Please try again later.");

    return step.data;
  });
