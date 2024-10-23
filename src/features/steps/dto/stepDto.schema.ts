import { z } from "zod";

export const StepDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  tripId: z.string(),

  rank: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  latitude: z.number(),
  longitude: z.number(),

  placeId: z.string(),
  transportMode: z.string(),
});
export const StepsDtoSchema = z.array(StepDtoSchema);

export type StepDto = z.infer<typeof StepDtoSchema>;
export type StepsDto = z.infer<typeof StepsDtoSchema>;
