import { z } from "zod";

export const TaskScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "notes",
  "dueDate",
  "rank",
  "state",
  "createdAt",
  "updatedAt",
  "stepId",
]);

export default TaskScalarFieldEnumSchema;
