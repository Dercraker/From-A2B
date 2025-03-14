"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { UpdateTaskNotesByTaskIdQuery } from "./updateTaskNotesByTaskId.query";

const UpdateTaskNoteActionSchema = z.object({
  taskId: z.string(),
  markdown: z.string(),
});

export const UpdateTaskNoteActionAction = orgAction
  .schema(UpdateTaskNoteActionSchema)
  .action(async ({ parsedInput: { taskId, markdown } }) =>
    UpdateTaskNotesByTaskIdQuery({
      taskId,
      markdown,
    }),
  );
