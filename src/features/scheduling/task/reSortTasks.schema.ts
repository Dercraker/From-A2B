import { z } from "zod";
import { TaskSchema } from "../dto/taskDto.schema";

export const ReSortTasksSchema = z.object({
  tasks: z.array(TaskSchema),
});

export type ReSortTasksSchemaType = z.infer<typeof ReSortTasksSchema>;
