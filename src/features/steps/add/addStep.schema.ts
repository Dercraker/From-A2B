import { TransportMode } from "@prisma/client";
import { z } from "zod";

export const AddStepSchema = z.object({
  tripId: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),

  placeId: z.string().optional(),
  TransportMode: z.nativeEnum(TransportMode).default(TransportMode.Car),
});

export type AddStepSchema = z.infer<typeof AddStepSchema>;
