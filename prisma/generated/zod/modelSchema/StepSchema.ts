import { z } from "zod";
import { Prisma } from "@prisma/client";
import { TransportModeSchema } from "../inputTypeSchemas/TransportModeSchema";
import {
  TripWithRelationsSchema,
  TripOptionalDefaultsWithRelationsSchema,
} from "./TripSchema";
import type {
  TripWithRelations,
  TripOptionalDefaultsWithRelations,
} from "./TripSchema";
import {
  RoadWithRelationsSchema,
  RoadOptionalDefaultsWithRelationsSchema,
} from "./RoadSchema";
import type {
  RoadWithRelations,
  RoadOptionalDefaultsWithRelations,
} from "./RoadSchema";
import {
  TaskWithRelationsSchema,
  TaskOptionalDefaultsWithRelationsSchema,
} from "./TaskSchema";
import type {
  TaskWithRelations,
  TaskOptionalDefaultsWithRelations,
} from "./TaskSchema";
import {
  FileWithRelationsSchema,
  FileOptionalDefaultsWithRelationsSchema,
} from "./FileSchema";
import type {
  FileWithRelations,
  FileOptionalDefaultsWithRelations,
} from "./FileSchema";

/////////////////////////////////////////
// STEP SCHEMA
/////////////////////////////////////////

export const StepSchema = z.object({
  TransportMode: TransportModeSchema,
  id: z.string().cuid(),
  slug: z.string(),
  tripId: z.string(),
  rank: z.number().int(),
  name: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  description: z.string().nullable(),
  latitude: z.instanceof(Prisma.Decimal, {
    message: "Field 'latitude' must be a Decimal. Location: ['Models', 'Step']",
  }),
  longitude: z.instanceof(Prisma.Decimal, {
    message:
      "Field 'longitude' must be a Decimal. Location: ['Models', 'Step']",
  }),
  placeId: z.string(),
  schedulingNotes: z.string().nullable(),
  roadId: z.string().nullable(),
});

export type Step = z.infer<typeof StepSchema>;

/////////////////////////////////////////
// STEP OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const StepOptionalDefaultsSchema = StepSchema.merge(
  z.object({
    TransportMode: TransportModeSchema.optional(),
    id: z.string().cuid().optional(),
    placeId: z.string().optional(),
  }),
);

export type StepOptionalDefaults = z.infer<typeof StepOptionalDefaultsSchema>;

/////////////////////////////////////////
// STEP RELATION SCHEMA
/////////////////////////////////////////

export type StepRelations = {
  trip?: TripWithRelations | null;
  road?: RoadWithRelations | null;
  Task: TaskWithRelations[];
  File: FileWithRelations[];
};

export type StepWithRelations = z.infer<typeof StepSchema> & StepRelations;

export const StepWithRelationsSchema: z.ZodType<StepWithRelations> =
  StepSchema.merge(
    z.object({
      trip: z.lazy(() => TripWithRelationsSchema).nullable(),
      road: z.lazy(() => RoadWithRelationsSchema).nullable(),
      Task: z.lazy(() => TaskWithRelationsSchema).array(),
      File: z.lazy(() => FileWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// STEP OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type StepOptionalDefaultsRelations = {
  trip?: TripOptionalDefaultsWithRelations | null;
  road?: RoadOptionalDefaultsWithRelations | null;
  Task: TaskOptionalDefaultsWithRelations[];
  File: FileOptionalDefaultsWithRelations[];
};

export type StepOptionalDefaultsWithRelations = z.infer<
  typeof StepOptionalDefaultsSchema
> &
  StepOptionalDefaultsRelations;

export const StepOptionalDefaultsWithRelationsSchema: z.ZodType<StepOptionalDefaultsWithRelations> =
  StepOptionalDefaultsSchema.merge(
    z.object({
      trip: z.lazy(() => TripOptionalDefaultsWithRelationsSchema).nullable(),
      road: z.lazy(() => RoadOptionalDefaultsWithRelationsSchema).nullable(),
      Task: z.lazy(() => TaskOptionalDefaultsWithRelationsSchema).array(),
      File: z.lazy(() => FileOptionalDefaultsWithRelationsSchema).array(),
    }),
  );

export default StepSchema;
