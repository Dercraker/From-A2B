"use server";

import { authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { UpdateTaskStatusSchema } from "./updateTaskStatus.schema";
import { UpdateTaskStatusByTaskIdQuery } from "./updateTaskStatusByTaskId.query";

export const UpdateTaskStatusAction = authAction
  .schema(UpdateTaskStatusSchema)
  .action(async ({ parsedInput: { taskId, state } }) => {
    try {
      const updatedTask = await UpdateTaskStatusByTaskIdQuery({
        taskId,
        state,
      });

      return updatedTask;
    } catch (error) {
      logger.error("Error updating task status:", error);
      throw new Error("Failed to update task status");
    }
  });
