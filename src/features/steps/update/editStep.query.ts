import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type EditStepQueryType = {
  step: Prisma.StepUpdateInput;
  where: Prisma.StepWhereUniqueInput;
};

export const EditStepQuery = async ({ step, where }: EditStepQueryType) => {
  const newStep = await prisma.step.update({
    where,
    data: step,
  });

  return newStep.name;
};

export type AddStepQuery = NonNullable<
  Prisma.PromiseReturnType<typeof EditStepQuery>
>;
