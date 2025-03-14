import { TransportMode } from "@prisma/client";
import { z } from "zod";

export const EditStepSchema = z.object({
  tripSlug: z.string(),
  stepId: z.string(),

  name: z.string().min(3),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  description: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),

  placeId: z.string().nullable(),
  TransportMode: z.nativeEnum(TransportMode).default(TransportMode.Car),
});

export type EditStepSchema = z.infer<typeof EditStepSchema>;
