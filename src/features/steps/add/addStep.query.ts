import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type AddStepQueryType = {
  step: Prisma.StepCreateInput;
};

export const AddStepQuery = async ({ step }: AddStepQueryType) => {
  const newStep = await prisma.step.create({
    data: step,
    
  });

  return newStep;
};

export type AddStepQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddStepQuery>
>;
