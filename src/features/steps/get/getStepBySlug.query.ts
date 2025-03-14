import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetStepBySlugQueryType = {
  stepSlug: string;
  where?: Prisma.StepWhereUniqueInput;
  include?: Prisma.StepInclude;
  select?: Prisma.StepSelect;
};

export const GetStepBySlugQuery = async ({
  stepSlug,
  where,
  include,
  select,
}: GetStepBySlugQueryType) => {
  const step = await prisma.step.findUniqueOrThrow({
    where: { ...where, slug: stepSlug },
    ...(include && { include }),
    ...(select && { select }),
    // include: {
    //   File: true,
    //   Task: {
    //     orderBy: {
    //       rank: "asc",
    //     },
    //   },
    // },
  });

  return step;
};

export type GetStepBySlugQuery = Prisma.PromiseReturnType<
  typeof GetStepBySlugQuery
>;
