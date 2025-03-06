import { TaskState } from "@prisma/client";
import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  notes: z.string().nullable(),
  dueDate: z.date().nullable(),
  rank: z.number(),
  state: z.nativeEnum(TaskState),
  createdAt: z.date(),
  updatedAt: z.date(),
  stepId: z.string(),
});

export type TaskDto = z.infer<typeof TaskSchema>;
