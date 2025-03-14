"use server";

import { StepSchema } from "@generated/modelSchema";
import { orgAction } from "@lib/actions/safe-actions";
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

    return z.array(StepSchema).parseAsync(steps);
  });
