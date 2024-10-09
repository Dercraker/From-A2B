import { z } from "zod";

export const TripListDtoSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  orgSlug: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  image: z.string().nullable(),
});
export const TripsListDtoSchema = z.array(TripListDtoSchema);

export type TripListDtoSchema = z.infer<typeof TripListDtoSchema>;
export type TripsListDtoSchema = z.infer<typeof TripsListDtoSchema>;
