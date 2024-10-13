import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepsDtoSchema } from "../dto/stepDto.schema";

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

  return StepsDtoSchema.safeParse(
    steps.map((step) => ({
      ...step,
      latitude: Number(step.latitude),
      longitude: Number(step.longitude),
    })),
  );
};
