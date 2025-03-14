import { TaskState } from "@prisma/client";
import { z } from "zod";

export const TaskStatusSchema = z.nativeEnum(TaskState);

export type TaskStatusType = z.infer<typeof TaskStatusSchema>;

export const TaskStatusLabels: Record<TaskStatusType, string> = {
  Todo: "To do",
  InProgress: "In progress",
  Done: "Done",
  Canceled: "Canceled",
  Blocked: "Blocked",
};
