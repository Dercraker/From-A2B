"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { UpdateTaskQuery } from "./updateTask.query";

const UpdateTaskActionSchema = z.object({
  taskId: z.string(),
  dueDate: z.date().optional(),
  notes: z.string().optional(),
  title: z.string(),
});

export const UpdateTaskActionAction = orgAction
  .schema(UpdateTaskActionSchema)
  .action(async ({ parsedInput: { taskId, dueDate, title } }) =>
    UpdateTaskQuery({ taskId, dueDate, title }),
  );
