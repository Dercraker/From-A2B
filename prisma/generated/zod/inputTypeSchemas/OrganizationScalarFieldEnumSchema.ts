import { z } from "zod";

export const OrganizationScalarFieldEnumSchema = z.enum([
  "id",
  "slug",
  "name",
  "image",
  "planId",
  "email",
  "stripeCustomerId",
  "createdAt",
  "updatedAt",
]);

export default OrganizationScalarFieldEnumSchema;
