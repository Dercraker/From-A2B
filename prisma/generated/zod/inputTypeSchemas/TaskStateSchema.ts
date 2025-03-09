import { z } from "zod";

export const TaskStateSchema = z.enum([
  "Todo",
  "InProgress",
  "Blocked",
  "Done",
  "Canceled",
]);

export type TaskStateType = `${z.infer<typeof TaskStateSchema>}`;

export default TaskStateSchema;
