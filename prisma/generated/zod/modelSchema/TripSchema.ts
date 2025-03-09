import { z } from "zod";
import {
  OrganizationWithRelationsSchema,
  OrganizationOptionalDefaultsWithRelationsSchema,
} from "./OrganizationSchema";
import type {
  OrganizationWithRelations,
  OrganizationOptionalDefaultsWithRelations,
} from "./OrganizationSchema";
import {
  StepWithRelationsSchema,
  StepOptionalDefaultsWithRelationsSchema,
} from "./StepSchema";
import type {
  StepWithRelations,
  StepOptionalDefaultsWithRelations,
} from "./StepSchema";
import {
  RoadWithRelationsSchema,
  RoadOptionalDefaultsWithRelationsSchema,
} from "./RoadSchema";
import type {
  RoadWithRelations,
  RoadOptionalDefaultsWithRelations,
} from "./RoadSchema";

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const TripSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  organizationId: z.string(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export type Trip = z.infer<typeof TripSchema>;

/////////////////////////////////////////
// TRIP OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TripOptionalDefaultsSchema = TripSchema.merge(
  z.object({
    id: z.string().cuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type TripOptionalDefaults = z.infer<typeof TripOptionalDefaultsSchema>;

/////////////////////////////////////////
// TRIP RELATION SCHEMA
/////////////////////////////////////////

export type TripRelations = {
  Organization: OrganizationWithRelations;
  steps: StepWithRelations[];
  Road: RoadWithRelations[];
};

export type TripWithRelations = z.infer<typeof TripSchema> & TripRelations;

export const TripWithRelationsSchema: z.ZodType<TripWithRelations> =
  TripSchema.merge(
    z.object({
      Organization: z.lazy(() => OrganizationWithRelationsSchema),
      steps: z.lazy(() => StepWithRelationsSchema).array(),
      Road: z.lazy(() => RoadWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// TRIP OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TripOptionalDefaultsRelations = {
  Organization: OrganizationOptionalDefaultsWithRelations;
  steps: StepOptionalDefaultsWithRelations[];
  Road: RoadOptionalDefaultsWithRelations[];
};

export type TripOptionalDefaultsWithRelations = z.infer<
  typeof TripOptionalDefaultsSchema
> &
  TripOptionalDefaultsRelations;

export const TripOptionalDefaultsWithRelationsSchema: z.ZodType<TripOptionalDefaultsWithRelations> =
  TripOptionalDefaultsSchema.merge(
    z.object({
      Organization: z.lazy(
        () => OrganizationOptionalDefaultsWithRelationsSchema,
      ),
      steps: z.lazy(() => StepOptionalDefaultsWithRelationsSchema).array(),
      Road: z.lazy(() => RoadOptionalDefaultsWithRelationsSchema).array(),
    }),
  );

export default TripSchema;
