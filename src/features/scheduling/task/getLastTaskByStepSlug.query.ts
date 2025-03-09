import { TaskSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetLastTaskByStepSlugQueryProps = { where: Prisma.StepWhereUniqueInput };

export const GetLastTaskByStepSlugQuery = async ({
  where,
}: GetLastTaskByStepSlugQueryProps) => {
  const step = await prisma.step.findUnique({
    where: {
      ...where,
    },
    include: {
      Task: {
        orderBy: {
          rank: "desc",
        },
        take: 1,
      },
    },
  });

  return TaskSchema.parseAsync(step?.Task[0]);
};

export type GetLastTaskByStepSlugQuery = Prisma.PromiseReturnType<
  typeof GetLastTaskByStepSlugQuery
>;
