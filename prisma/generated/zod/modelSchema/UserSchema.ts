import { z } from 'zod';
import { SessionWithRelationsSchema, SessionOptionalDefaultsWithRelationsSchema } from './SessionSchema'
import type { SessionWithRelations, SessionOptionalDefaultsWithRelations } from './SessionSchema'
import { AccountWithRelationsSchema, AccountOptionalDefaultsWithRelationsSchema } from './AccountSchema'
import type { AccountWithRelations, AccountOptionalDefaultsWithRelations } from './AccountSchema'
import { FeedbackWithRelationsSchema, FeedbackOptionalDefaultsWithRelationsSchema } from './FeedbackSchema'
import type { FeedbackWithRelations, FeedbackOptionalDefaultsWithRelations } from './FeedbackSchema'
import { OrganizationMembershipWithRelationsSchema, OrganizationMembershipOptionalDefaultsWithRelationsSchema } from './OrganizationMembershipSchema'
import type { OrganizationMembershipWithRelations, OrganizationMembershipOptionalDefaultsWithRelations } from './OrganizationMembershipSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  resendContactId: z.string().nullable(),
  passwordHash: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  sessions: SessionWithRelations[];
  accounts: AccountWithRelations[];
  feedbacks: FeedbackWithRelations[];
  organizations: OrganizationMembershipWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  feedbacks: z.lazy(() => FeedbackWithRelationsSchema).array(),
  organizations: z.lazy(() => OrganizationMembershipWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOptionalDefaultsRelations = {
  sessions: SessionOptionalDefaultsWithRelations[];
  accounts: AccountOptionalDefaultsWithRelations[];
  feedbacks: FeedbackOptionalDefaultsWithRelations[];
  organizations: OrganizationMembershipOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  sessions: z.lazy(() => SessionOptionalDefaultsWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountOptionalDefaultsWithRelationsSchema).array(),
  feedbacks: z.lazy(() => FeedbackOptionalDefaultsWithRelationsSchema).array(),
  organizations: z.lazy(() => OrganizationMembershipOptionalDefaultsWithRelationsSchema).array(),
}))

export default UserSchema;
