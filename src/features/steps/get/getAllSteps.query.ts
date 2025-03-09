import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

type GetAllStepByTripQueryProps = {
  where: Prisma.StepWhereInput;
  orderBy?: Prisma.StepOrderByWithRelationInput;
};

export const GetAllStepQuery = async ({
  where,
  orderBy,
}: GetAllStepByTripQueryProps) => {
  const steps = await prisma.step.findMany({
    where,
    orderBy,
  });

  return z.array(StepSchema).parseAsync(steps);
};

export type GetAllStepQuery = Prisma.PromiseReturnType<typeof GetAllStepQuery>;
