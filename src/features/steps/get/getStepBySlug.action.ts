"use server";

import { StepSchema } from "@generated/modelSchema";
import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetStepBySlugQuery } from "./getStepBySlug.query";

const GetStepBySlugSchema = z.object({
  stepSlug: z.string(),
});

export const GetStepBySlugAction = orgAction
  .schema(GetStepBySlugSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    const step = await GetStepBySlugQuery({ stepSlug });

    return StepSchema.parseAsync(step);
  });
