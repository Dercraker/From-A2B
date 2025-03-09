import { StepSchema } from "@generated/modelSchema";
import { z } from "zod";

export const ReSortStepsSchema = z.object({
  steps: z.array(StepSchema),
});

export type ReSortStepsSchema = z.infer<typeof ReSortStepsSchema>;
