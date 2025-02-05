import { z } from "zod";
import { LocationSchema } from "./location.type";

export const PoiSchema = z.object({
  key: z.string(),
  location: LocationSchema,
});
export const PoisSchema = z.array(PoiSchema);

export type Poi = z.infer<typeof PoiSchema>;
export type Pois = z.infer<typeof PoisSchema>;
