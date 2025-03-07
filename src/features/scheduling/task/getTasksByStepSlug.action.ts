"use server";

import { GetStepBySlugQuery } from "@feat/steps/get/getStepBySlug.query";
import { ActionError, authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { z } from "zod";

const GetTasksByStepSlugSchema = z.object({
  stepSlug: z.string(),
});

export const GetTasksByStepSlugAction = authAction
  .schema(GetTasksByStepSlugSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    try {
      const step = await GetStepBySlugQuery({
        stepSlug,
        where: {
          slug: stepSlug,
        },
      });

      if (!step?.data) throw new ActionError("Step not found");

      return step.data.Task;
    } catch (error) {
      logger.error("Error fetching tasks:", error);
      throw new ActionError("Failed to fetch tasks");
    }
  });
