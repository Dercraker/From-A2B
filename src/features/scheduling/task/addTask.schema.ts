import { z } from "zod";

export const AddTaskSchema = z.object({
  title: z.string().min(3),
  dueDate: z.date().optional(),
});

export type AddTaskSchema = z.infer<typeof AddTaskSchema>;
