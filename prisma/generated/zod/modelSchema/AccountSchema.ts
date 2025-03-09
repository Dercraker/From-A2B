import { z } from "zod";
import {
  UserWithRelationsSchema,
  UserOptionalDefaultsWithRelationsSchema,
} from "./UserSchema";
import type {
  UserWithRelations,
  UserOptionalDefaultsWithRelations,
} from "./UserSchema";

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refreshTokenExpiresIn: z.string().nullable(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// ACCOUNT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AccountOptionalDefaultsSchema = AccountSchema.merge(
  z.object({
    id: z.string().optional(),
  }),
);

export type AccountOptionalDefaults = z.infer<
  typeof AccountOptionalDefaultsSchema
>;

/////////////////////////////////////////
// ACCOUNT RELATION SCHEMA
/////////////////////////////////////////

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> &
  AccountRelations;

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> =
  AccountSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// ACCOUNT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AccountOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
};

export type AccountOptionalDefaultsWithRelations = z.infer<
  typeof AccountOptionalDefaultsSchema
> &
  AccountOptionalDefaultsRelations;

export const AccountOptionalDefaultsWithRelationsSchema: z.ZodType<AccountOptionalDefaultsWithRelations> =
  AccountOptionalDefaultsSchema.merge(
    z.object({
      user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
    }),
  );

export default AccountSchema;
