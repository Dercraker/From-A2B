import { z } from 'zod';
import { StepWithRelationsSchema, StepOptionalDefaultsWithRelationsSchema } from './StepSchema'
import type { StepWithRelations, StepOptionalDefaultsWithRelations } from './StepSchema'
import { TripWithRelationsSchema, TripOptionalDefaultsWithRelationsSchema } from './TripSchema'
import type { TripWithRelations, TripOptionalDefaultsWithRelations } from './TripSchema'

/////////////////////////////////////////
// ROAD SCHEMA
/////////////////////////////////////////

export const RoadSchema = z.object({
  id: z.string().cuid(),
  distance: z.number().int(),
  duration: z.number().int(),
  polyline: z.string(),
  stepId: z.string(),
  tripId: z.string(),
})

export type Road = z.infer<typeof RoadSchema>

/////////////////////////////////////////
// ROAD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RoadOptionalDefaultsSchema = RoadSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type RoadOptionalDefaults = z.infer<typeof RoadOptionalDefaultsSchema>

/////////////////////////////////////////
// ROAD RELATION SCHEMA
/////////////////////////////////////////

export type RoadRelations = {
  step: StepWithRelations;
  trip?: TripWithRelations | null;
};

export type RoadWithRelations = z.infer<typeof RoadSchema> & RoadRelations

export const RoadWithRelationsSchema: z.ZodType<RoadWithRelations> = RoadSchema.merge(z.object({
  step: z.lazy(() => StepWithRelationsSchema),
  trip: z.lazy(() => TripWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// ROAD OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type RoadOptionalDefaultsRelations = {
  step: StepOptionalDefaultsWithRelations;
  trip?: TripOptionalDefaultsWithRelations | null;
};

export type RoadOptionalDefaultsWithRelations = z.infer<typeof RoadOptionalDefaultsSchema> & RoadOptionalDefaultsRelations

export const RoadOptionalDefaultsWithRelationsSchema: z.ZodType<RoadOptionalDefaultsWithRelations> = RoadOptionalDefaultsSchema.merge(z.object({
  step: z.lazy(() => StepOptionalDefaultsWithRelationsSchema),
  trip: z.lazy(() => TripOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default RoadSchema;
