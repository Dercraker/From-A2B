import { TransportMode } from "@prisma/client";
import { z } from "zod";
import { StepDtoSchema } from "../dto/stepDto.schema";

export const AddStepSchema = z.object({
  tripSlug: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),

  placeId: z.string().optional(),
  TransportMode: z.nativeEnum(TransportMode).default(TransportMode.Car),

  stepBefore: StepDtoSchema.optional(),
  stepAfter: StepDtoSchema.optional(),
});

export type AddStepSchema = z.infer<typeof AddStepSchema>;
