"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { ReSortStepsSchema } from "./reSortStep.schema";
import { ReSortStepsQuery } from "./reSortSteps.query";

export const ReSortStepsAction = orgAction
  .schema(ReSortStepsSchema)
  .action(async ({ parsedInput: { steps } }) => {
    await ReSortStepsQuery({ steps });
  });
