import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepSchema } from "../../../../prisma/generated/zod";

type GetStepQueryProps = {
  where: Prisma.StepWhereUniqueInput;
};

export const GetStepQuery = async ({ where }: GetStepQueryProps) => {
  const step = await prisma.step.findFirst({
    where: {
      ...where,
    },
  });
  return StepSchema.parseAsync(step);
};

export type GetStepQuery = Prisma.PromiseReturnType<typeof GetStepQuery>;
