import { z } from "zod";

export const EditTripSchema = z.object({
  tripSlug: z.string(),
  name: z.string(),
  startDate: z.date(),
  description: z.string().nullable(),
  image: z
    .object({
      url: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .optional(),
});

export type EditTrip = z.infer<typeof EditTripSchema>;
