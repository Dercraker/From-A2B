import { z } from "zod";

export const RoadTypeSchema = z.object({
  distance: z.number(),
  duration: z.number(),
  polyline: z.string(),
});

export type RoadType = z.infer<typeof RoadTypeSchema>;
