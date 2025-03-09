import { z } from "zod";

export const RoadScalarFieldEnumSchema = z.enum([
  "id",
  "distance",
  "duration",
  "polyline",
  "stepId",
  "tripId",
]);

export default RoadScalarFieldEnumSchema;
