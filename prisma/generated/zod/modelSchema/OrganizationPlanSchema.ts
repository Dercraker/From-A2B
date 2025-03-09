import { z } from 'zod';
import { OrganizationWithRelationsSchema, OrganizationOptionalDefaultsWithRelationsSchema } from './OrganizationSchema'
import type { OrganizationWithRelations, OrganizationOptionalDefaultsWithRelations } from './OrganizationSchema'

/////////////////////////////////////////
// ORGANIZATION PLAN SCHEMA
/////////////////////////////////////////

export const OrganizationPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  maximumMembers: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type OrganizationPlan = z.infer<typeof OrganizationPlanSchema>

/////////////////////////////////////////
// ORGANIZATION PLAN OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OrganizationPlanOptionalDefaultsSchema = OrganizationPlanSchema.merge(z.object({
  id: z.string().optional(),
  maximumMembers: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OrganizationPlanOptionalDefaults = z.infer<typeof OrganizationPlanOptionalDefaultsSchema>

/////////////////////////////////////////
// ORGANIZATION PLAN RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationPlanRelations = {
  organization: OrganizationWithRelations[];
};

export type OrganizationPlanWithRelations = z.infer<typeof OrganizationPlanSchema> & OrganizationPlanRelations

export const OrganizationPlanWithRelationsSchema: z.ZodType<OrganizationPlanWithRelations> = OrganizationPlanSchema.merge(z.object({
  organization: z.lazy(() => OrganizationWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ORGANIZATION PLAN OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationPlanOptionalDefaultsRelations = {
  organization: OrganizationOptionalDefaultsWithRelations[];
};

export type OrganizationPlanOptionalDefaultsWithRelations = z.infer<typeof OrganizationPlanOptionalDefaultsSchema> & OrganizationPlanOptionalDefaultsRelations

export const OrganizationPlanOptionalDefaultsWithRelationsSchema: z.ZodType<OrganizationPlanOptionalDefaultsWithRelations> = OrganizationPlanOptionalDefaultsSchema.merge(z.object({
  organization: z.lazy(() => OrganizationOptionalDefaultsWithRelationsSchema).array(),
}))

export default OrganizationPlanSchema;
