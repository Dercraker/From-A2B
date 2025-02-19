"use server";

import { ActionError, orgAction } from "@lib/actions/safe-actions";
import { z } from "zod";
import { GetAllStepQuery } from "./getAllSteps.query";

const GetAllStepSchema = z.object({
  tripSlug: z.string(),
});

export const GetAllStepAction = orgAction
  .schema(GetAllStepSchema)
  .action(async ({ parsedInput: { tripSlug } }) => {
    const steps = await GetAllStepQuery({
      where: {
        trip: {
          slug: tripSlug,
        },
      },
      orderBy: {
        rank: "asc",
      },
    });

    if (!steps.success) throw new ActionError(steps.error.message);
    return steps;
  });
