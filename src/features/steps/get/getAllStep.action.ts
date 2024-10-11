"use server";

import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { z } from "zod";
import { GetAllStepQuery } from "./getAllSteps.query";

const GetAllStepSchema = z.object({
  tripId: z.string(),
});

export const GetAllStepAction = orgAction
  .schema(GetAllStepSchema)
  .action(async ({ parsedInput: { tripId } }) => {
    const steps = await GetAllStepQuery({
      where: {
        tripId,
      },
    });

    if (!steps.success)
      throw new ActionError(`Failed to fetch steps ${steps.error}`);

    return steps;
  });
