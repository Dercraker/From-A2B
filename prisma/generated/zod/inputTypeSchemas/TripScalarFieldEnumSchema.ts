import { z } from "zod";

export const TripScalarFieldEnumSchema = z.enum([
  "id",
  "slug",
  "organizationId",
  "name",
  "startDate",
  "endDate",
  "description",
  "image",
  "createdAt",
  "updatedAt",
  "deletedAt",
]);

export default TripScalarFieldEnumSchema;
