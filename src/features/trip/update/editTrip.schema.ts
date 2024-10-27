import { z } from "zod";

export const EditTripSchema = z.object({
  tripId: z.string(),
  name: z.string(),
  startDate: z.date(),
  description: z.string().nullable(),
  image: z.string().nullable(),
});

export type EditTrip = z.infer<typeof EditTripSchema>;
