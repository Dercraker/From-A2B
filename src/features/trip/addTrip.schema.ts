import { z } from "zod";

export const AddTripSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(1000).optional(),
  startDate: z.date(),
});

export type AddTripSchema = z.infer<typeof AddTripSchema>;
