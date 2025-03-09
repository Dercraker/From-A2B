import { StepSchema } from "@generated/modelSchema";
import { TransportMode } from "@prisma/client";
import { z } from "zod";

export const AddStepSchema = z.object({
  tripSlug: z.string(),
  name: z.string().min(3).max(255),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  description: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),

  placeId: z.string().optional(),
  TransportMode: z.nativeEnum(TransportMode).default(TransportMode.Car),

  stepBefore: StepSchema.optional(),
  stepAfter: StepSchema.optional(),
});

export type AddStepSchema = z.infer<typeof AddStepSchema>;
