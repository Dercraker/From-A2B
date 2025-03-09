import { z } from 'zod';
import { TaskStateSchema } from '../inputTypeSchemas/TaskStateSchema'
import { StepWithRelationsSchema, StepOptionalDefaultsWithRelationsSchema } from './StepSchema'
import type { StepWithRelations, StepOptionalDefaultsWithRelations } from './StepSchema'

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  state: TaskStateSchema,
  id: z.string().cuid(),
  title: z.string(),
  notes: z.string().nullable(),
  dueDate: z.coerce.date().nullable(),
  rank: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stepId: z.string(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// TASK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TaskOptionalDefaultsSchema = TaskSchema.merge(z.object({
  state: TaskStateSchema.optional(),
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TaskOptionalDefaults = z.infer<typeof TaskOptionalDefaultsSchema>

/////////////////////////////////////////
// TASK RELATION SCHEMA
/////////////////////////////////////////

export type TaskRelations = {
  step?: StepWithRelations | null;
};

export type TaskWithRelations = z.infer<typeof TaskSchema> & TaskRelations

export const TaskWithRelationsSchema: z.ZodType<TaskWithRelations> = TaskSchema.merge(z.object({
  step: z.lazy(() => StepWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// TASK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TaskOptionalDefaultsRelations = {
  step?: StepOptionalDefaultsWithRelations | null;
};

export type TaskOptionalDefaultsWithRelations = z.infer<typeof TaskOptionalDefaultsSchema> & TaskOptionalDefaultsRelations

export const TaskOptionalDefaultsWithRelationsSchema: z.ZodType<TaskOptionalDefaultsWithRelations> = TaskOptionalDefaultsSchema.merge(z.object({
  step: z.lazy(() => StepOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default TaskSchema;
