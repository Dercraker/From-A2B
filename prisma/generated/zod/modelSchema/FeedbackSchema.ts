import { z } from 'zod';
import { UserWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.string(),
  review: z.number().int(),
  message: z.string(),
  email: z.string().nullable(),
  userId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// FEEDBACK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FeedbackOptionalDefaultsSchema = FeedbackSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type FeedbackOptionalDefaults = z.infer<typeof FeedbackOptionalDefaultsSchema>

/////////////////////////////////////////
// FEEDBACK RELATION SCHEMA
/////////////////////////////////////////

export type FeedbackRelations = {
  user?: UserWithRelations | null;
};

export type FeedbackWithRelations = z.infer<typeof FeedbackSchema> & FeedbackRelations

export const FeedbackWithRelationsSchema: z.ZodType<FeedbackWithRelations> = FeedbackSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// FEEDBACK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type FeedbackOptionalDefaultsRelations = {
  user?: UserOptionalDefaultsWithRelations | null;
};

export type FeedbackOptionalDefaultsWithRelations = z.infer<typeof FeedbackOptionalDefaultsSchema> & FeedbackOptionalDefaultsRelations

export const FeedbackOptionalDefaultsWithRelationsSchema: z.ZodType<FeedbackOptionalDefaultsWithRelations> = FeedbackOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullable(),
}))

export default FeedbackSchema;
