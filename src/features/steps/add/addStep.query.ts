import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type AddStepQueryType = {
  step: Prisma.StepCreateInput;
};

export const AddStepQuery = async ({ step }: AddStepQueryType) => {
  const newStep = await prisma.step.create({
    data: step,
  });

  return StepSchema.parseAsync(newStep);
};

export type AddStepQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddStepQuery>
>;
