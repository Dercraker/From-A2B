import { prisma } from "@lib/prisma";
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

  return step.File.map((file) => FileSchema.parse(file));
};
