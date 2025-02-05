import { z } from "zod";

export const TripDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  organizationId: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().nullable(),
  image: z.string().nullable(),

  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type TripDto = z.infer<typeof TripDtoSchema>;
