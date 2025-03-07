import { FileSchema } from "@feat/files/file.schema";
import { TaskSchema } from "@feat/scheduling/dto/taskDto.schema";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const StepDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  tripId: z.string(),

  rank: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  latitude: z.preprocess((val) => {
    if (typeof val === "string") return Number(new Prisma.Decimal(val));
    return Number(val);
  }, z.number()),
  longitude: z.preprocess((val) => {
    if (typeof val === "string") return Number(new Prisma.Decimal(val));
    return Number(val);
  }, z.number()),

  schedulingNotes: z.string().nullable(),

  placeId: z.string(),
  TransportMode: z.string(),
  Task: z.array(TaskSchema).optional(),
  File: z.array(FileSchema).optional(),
});
export const StepsDtoSchema = z.array(StepDtoSchema);

export type StepDto = z.infer<typeof StepDtoSchema>;
export type StepsDto = z.infer<typeof StepsDtoSchema>;
