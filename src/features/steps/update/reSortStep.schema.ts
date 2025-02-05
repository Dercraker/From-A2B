import { z } from "zod";
import { StepDtoSchema } from "../dto/stepDto.schema";

export const ReSortStepsSchema = z.object({
  steps: z.array(StepDtoSchema),
});

export type ReSortStepsSchema = z.infer<typeof ReSortStepsSchema>;
