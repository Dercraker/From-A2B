import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepDtoSchema } from "../dto/stepDto.schema";

type AddStepQueryType = {
  step: Prisma.StepCreateInput;
};

export const AddStepQuery = async ({ step }: AddStepQueryType) => {
  const newStep = await prisma.step.create({
    data: step,
  });

  return StepDtoSchema.parseAsync(newStep);
};

export type AddStepQuery = NonNullable<
  Prisma.PromiseReturnType<typeof AddStepQuery>
>;
