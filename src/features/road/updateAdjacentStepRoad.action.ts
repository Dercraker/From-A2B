"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { updateAdjacentMovedStepRoad } from "./updateAdjacentStepRoad";

const UpdateAdjacentMovedStepRoadActionSchema = z.object({
  stepId: z.string(),
});

export const UpdateAdjacentMovedStepRoadActionAction = orgAction
  .schema(UpdateAdjacentMovedStepRoadActionSchema)
  .action(async ({ parsedInput: { stepId } }) => {
    await updateAdjacentMovedStepRoad({ centerStepId: stepId });
  });
