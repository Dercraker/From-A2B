import { z } from "zod";

export const DeleteTripSchema = z.object({
  tripId: z.string(),
  orgId: z.string(),
});

export type DeleteTripSchema = z.infer<typeof DeleteTripSchema>;
