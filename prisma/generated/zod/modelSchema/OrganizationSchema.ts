import { z } from 'zod';
import { OrganizationPlanWithRelationsSchema, OrganizationPlanOptionalDefaultsWithRelationsSchema } from './OrganizationPlanSchema'
import type { OrganizationPlanWithRelations, OrganizationPlanOptionalDefaultsWithRelations } from './OrganizationPlanSchema'
import { OrganizationMembershipWithRelationsSchema, OrganizationMembershipOptionalDefaultsWithRelationsSchema } from './OrganizationMembershipSchema'
import type { OrganizationMembershipWithRelations, OrganizationMembershipOptionalDefaultsWithRelations } from './OrganizationMembershipSchema'
import { TripWithRelationsSchema, TripOptionalDefaultsWithRelationsSchema } from './TripSchema'
import type { TripWithRelations, TripOptionalDefaultsWithRelations } from './TripSchema'

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  planId: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// ORGANIZATION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OrganizationOptionalDefaultsSchema = OrganizationSchema.merge(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  planId: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OrganizationOptionalDefaults = z.infer<typeof OrganizationOptionalDefaultsSchema>

/////////////////////////////////////////
// ORGANIZATION RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationRelations = {
  plan: OrganizationPlanWithRelations;
  members: OrganizationMembershipWithRelations[];
  trips: TripWithRelations[];
};

export type OrganizationWithRelations = z.infer<typeof OrganizationSchema> & OrganizationRelations

export const OrganizationWithRelationsSchema: z.ZodType<OrganizationWithRelations> = OrganizationSchema.merge(z.object({
  plan: z.lazy(() => OrganizationPlanWithRelationsSchema),
  members: z.lazy(() => OrganizationMembershipWithRelationsSchema).array(),
  trips: z.lazy(() => TripWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ORGANIZATION OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationOptionalDefaultsRelations = {
  plan: OrganizationPlanOptionalDefaultsWithRelations;
  members: OrganizationMembershipOptionalDefaultsWithRelations[];
  trips: TripOptionalDefaultsWithRelations[];
};

export type OrganizationOptionalDefaultsWithRelations = z.infer<typeof OrganizationOptionalDefaultsSchema> & OrganizationOptionalDefaultsRelations

export const OrganizationOptionalDefaultsWithRelationsSchema: z.ZodType<OrganizationOptionalDefaultsWithRelations> = OrganizationOptionalDefaultsSchema.merge(z.object({
  plan: z.lazy(() => OrganizationPlanOptionalDefaultsWithRelationsSchema),
  members: z.lazy(() => OrganizationMembershipOptionalDefaultsWithRelationsSchema).array(),
  trips: z.lazy(() => TripOptionalDefaultsWithRelationsSchema).array(),
}))

export default OrganizationSchema;
