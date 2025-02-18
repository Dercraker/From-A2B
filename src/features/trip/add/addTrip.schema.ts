import { z } from "zod";

export const AddTripSchema = z.object({
  name: z
    .string({ required_error: "A title is required to create a trip" })
    .min(3, "The title must be at least 3 characters long")
    .max(255, "The title must be less than 255 characters long"),
  description: z
    .string()
    .max(1000, "The description must be less than 1000 characters long")
    .optional(),
  startDate: z.date({
    required_error: "Start date is required to create trip",
  }),
  image: z.string().url().optional(),
});

export type AddTripSchema = z.infer<typeof AddTripSchema>;
