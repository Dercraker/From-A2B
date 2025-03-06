"use server";

import { authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { z } from "zod";
import { DeleteTaskQuery } from "./deleteTask.query";
const DeleteTaskSchema = z.object({
  taskId: z.string(),
});

export const DeleteTaskAction = authAction
  .schema(DeleteTaskSchema)
  .action(async ({ parsedInput: { taskId } }) => {
    try {
      await DeleteTaskQuery({ taskId });
    } catch (error) {
      logger.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  });
