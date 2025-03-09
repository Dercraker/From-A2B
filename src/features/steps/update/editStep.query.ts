import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
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

  return StepSchema.parseAsync(newStep);
};

export type EditStepQuery = Prisma.PromiseReturnType<typeof EditStepQuery>;
