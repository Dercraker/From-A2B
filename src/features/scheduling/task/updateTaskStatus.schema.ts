import { z } from "zod";
import { TaskStatusSchema } from "./taskStatus.schema";

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string(),
  state: TaskStatusSchema,
});

export type UpdateTaskStatusSchemaType = z.infer<typeof UpdateTaskStatusSchema>;
