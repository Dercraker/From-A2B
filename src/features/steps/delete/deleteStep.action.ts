"use server";

import { updateAdjacentStepRoad } from "@feat/road/updateAdjacentStepRoad";
import { orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { DeleteStepQuery } from "./deleteStep.query";

const DeleteStepSchema = z.object({
  stepId: z.string(),
});

export const DeleteStepAction = orgAction
  .schema(DeleteStepSchema)
  .action(async ({ parsedInput: { stepId } }) => {
    await updateAdjacentStepRoad({ centerStepId: stepId });

    await DeleteStepQuery({
      where: {
        id: stepId,
      },
    });
  });
