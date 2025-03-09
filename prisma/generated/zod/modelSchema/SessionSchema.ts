import { z } from 'zod';
import { UserWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

/////////////////////////////////////////
// SESSION RELATION SCHEMA
/////////////////////////////////////////

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SESSION OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type SessionOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
};

export type SessionOptionalDefaultsWithRelations = z.infer<typeof SessionOptionalDefaultsSchema> & SessionOptionalDefaultsRelations

export const SessionOptionalDefaultsWithRelationsSchema: z.ZodType<SessionOptionalDefaultsWithRelations> = SessionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

export default SessionSchema;
