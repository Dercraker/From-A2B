import { StepWithRelationsSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetStepBySlugQueryType = {
  stepSlug: string;
  where?: Prisma.StepWhereUniqueInput;
};

export const GetStepBySlugQuery = async ({
  stepSlug,
  where,
}: GetStepBySlugQueryType) => {
  const step = await prisma.step.findUniqueOrThrow({
    where: { ...where, slug: stepSlug },
    include: {
      File: true,
      Task: {
        orderBy: {
          rank: "asc",
        },
      },
    },
  });

  return StepWithRelationsSchema.parseAsync(step);
};

export type GetStepBySlugQuery = Prisma.PromiseReturnType<
  typeof GetStepBySlugQuery
>;
