"use server";

import { orgAction } from "@lib/actions/safe-actions";
import { GetStepRank } from "@utils/GetStepRank";
import { z } from "zod";
import { AddTaskToStepQuery } from "./addTaskToStep.query";
import { GetLastTaskByStepSlugQuery } from "./getLastTaskByStepSlug.query";

const AddTaskToStepByStepSlugActionSchema = z.object({
  stepSlug: z.string(),
  title: z.string(),
  dueDate: z.date().optional(),
});

export const AddTaskToStepByStepSlugActionAction = orgAction
  .schema(AddTaskToStepByStepSlugActionSchema)
  .action(async ({ parsedInput: { stepSlug, title, dueDate } }) => {
    const lastTask = await GetLastTaskByStepSlugQuery({
      where: { slug: stepSlug },
    });

    await AddTaskToStepQuery({
      where: {
        slug: stepSlug,
      },
      data: {
        title,
        dueDate,
        rank: GetStepRank({ previousRank: lastTask?.rank ?? undefined }),
      },
    });
  });
