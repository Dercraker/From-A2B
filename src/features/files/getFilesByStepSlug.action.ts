"use server";

import { authAction } from "@lib/actions/safe-actions";
import { logger } from "@lib/logger";
import { prisma } from "@lib/prisma";
import { z } from "zod";
import { FileSchema } from "./file.schema";

const GetFilesByStepSlugSchema = z.object({
  stepSlug: z.string(),
});

export const GetFilesByStepSlugAction = authAction
  .schema(GetFilesByStepSlugSchema)
  .action(async ({ parsedInput: { stepSlug } }) => {
    try {
      const step = await prisma.step.findUnique({
        where: {
          slug: stepSlug,
        },
        include: {
          File: true,
        },
      });

      if (!step) {
        throw new Error(`Step with slug ${stepSlug} not found`);
      }

      return step.File.map((file) => FileSchema.parse(file));
    } catch (error) {
      logger.error("Error getting files:", error);
      throw new Error("Failed to get files");
    }
  });
