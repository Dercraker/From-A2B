import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { FileSchema } from "./file.schema";

type GetFilesByStepSlugQueryProps = {
  stepSlug: string;
};

export const GetFilesByStepSlugQuery = async ({
  stepSlug,
}: GetFilesByStepSlugQueryProps) => {
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

  const files = await Promise.all(
    step.File.map(async (file) => FileSchema.parseAsync(file)),
  );

  return files;
};

export type GetFilesByStepSlugQuery = Prisma.PromiseReturnType<
  typeof GetFilesByStepSlugQuery
>;
