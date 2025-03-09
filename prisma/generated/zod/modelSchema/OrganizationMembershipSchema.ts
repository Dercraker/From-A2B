import { z } from "zod";
import { OrganizationMembershipRoleSchema } from "../inputTypeSchemas/OrganizationMembershipRoleSchema";
import {
  UserWithRelationsSchema,
  UserOptionalDefaultsWithRelationsSchema,
} from "./UserSchema";
import type {
  UserWithRelations,
  UserOptionalDefaultsWithRelations,
} from "./UserSchema";
import {
  OrganizationWithRelationsSchema,
  OrganizationOptionalDefaultsWithRelationsSchema,
} from "./OrganizationSchema";
import type {
  OrganizationWithRelations,
  OrganizationOptionalDefaultsWithRelations,
} from "./OrganizationSchema";

/////////////////////////////////////////
// ORGANIZATION MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const OrganizationMembershipSchema = z.object({
  roles: OrganizationMembershipRoleSchema.array(),
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type OrganizationMembership = z.infer<
  typeof OrganizationMembershipSchema
>;

/////////////////////////////////////////
// ORGANIZATION MEMBERSHIP OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OrganizationMembershipOptionalDefaultsSchema =
  OrganizationMembershipSchema.merge(
    z.object({
      roles: OrganizationMembershipRoleSchema.array().optional(),
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    }),
  );

export type OrganizationMembershipOptionalDefaults = z.infer<
  typeof OrganizationMembershipOptionalDefaultsSchema
>;

/////////////////////////////////////////
// ORGANIZATION MEMBERSHIP RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationMembershipRelations = {
  user: UserWithRelations;
  organization: OrganizationWithRelations;
};

export type OrganizationMembershipWithRelations = z.infer<
  typeof OrganizationMembershipSchema
> &
  OrganizationMembershipRelations;

export const OrganizationMembershipWithRelationsSchema: z.ZodType<OrganizationMembershipWithRelations> =
  OrganizationMembershipSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
      organization: z.lazy(() => OrganizationWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// ORGANIZATION MEMBERSHIP OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationMembershipOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  organization: OrganizationOptionalDefaultsWithRelations;
};

export type OrganizationMembershipOptionalDefaultsWithRelations = z.infer<
  typeof OrganizationMembershipOptionalDefaultsSchema
> &
  OrganizationMembershipOptionalDefaultsRelations;

export const OrganizationMembershipOptionalDefaultsWithRelationsSchema: z.ZodType<OrganizationMembershipOptionalDefaultsWithRelations> =
  OrganizationMembershipOptionalDefaultsSchema.merge(
    z.object({
      user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
      organization: z.lazy(
        () => OrganizationOptionalDefaultsWithRelationsSchema,
      ),
    }),
  );

export default OrganizationMembershipSchema;
