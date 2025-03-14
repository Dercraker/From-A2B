"use server";

import { ActionError, authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { ReSortTasksQuery } from "./reSortTasks.query";
import { ReSortTasksSchema } from "./reSortTasks.schema";

export const ReSortTasksAction = authAction
  .schema(ReSortTasksSchema)
  .action(async ({ parsedInput: { tasks } }) => {
    try {
      await ReSortTasksQuery({ tasks });

      return {
        data: {
          success: true,
        },
      };
    } catch (error) {
      logger.error("Error resorting tasks:", error);
      throw new ActionError(`Error resorting tasks: ${error}`);
    }
  });
