import { TaskSchema } from "@generated/modelSchema";
import { z } from "zod";

export const ReSortTasksSchema = z.object({
  tasks: z.array(TaskSchema),
});

export type ReSortTasksSchemaType = z.infer<typeof ReSortTasksSchema>;
