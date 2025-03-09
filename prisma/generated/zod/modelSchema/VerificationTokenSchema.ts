import { z } from "zod";
import { JsonValueSchema } from "../inputTypeSchemas/JsonValueSchema";

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  data: JsonValueSchema.nullable(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const VerificationTokenOptionalDefaultsSchema =
  VerificationTokenSchema.merge(z.object({}));

export type VerificationTokenOptionalDefaults = z.infer<
  typeof VerificationTokenOptionalDefaultsSchema
>;

export default VerificationTokenSchema;
