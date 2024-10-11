import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepsDtoSchema } from "../dto/stepDto.schema";

type GetAllStepByTripQueryProps = {
  where: Prisma.StepWhereInput;
};

export const GetAllStepQuery = async ({
  where,
}: GetAllStepByTripQueryProps) => {
  const steps = await prisma.step.findMany({
    where,
  });

  return StepsDtoSchema.safeParse(steps);
};
