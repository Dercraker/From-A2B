"use server";

import { TaskSchema } from "@generated/modelSchema";
import { ActionError, authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { z } from "zod";
import { GetTasksByStepSlugQuery } from "./getTaskByStepSlug.query";

const GetTasksByStepSlugSchema = z.object({
  stepSlug: z.string(),
});

export const GetTasksByStepSlugAction = authAction
  .schema(GetTasksByStepSlugSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    try {
      const tasks = await GetTasksByStepSlugQuery({
        stepSlug,
        orderBy: {
          rank: "asc",
        },
      });

      if (!tasks) throw new ActionError("No tasks found");

      return TaskSchema.array().parseAsync(tasks);
    } catch (error) {
      logger.error("Error fetching tasks:", error);
      throw new ActionError("Failed to fetch tasks");
    }
  });
