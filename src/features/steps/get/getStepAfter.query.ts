import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepDtoSchema } from "../dto/stepDto.schema";

export const GetStepAfterQuery = async ({
  ...where
}: Prisma.StepWhereUniqueInput) => {
  const step = await prisma.step.findUnique({
    where,
  });

  if (!step) return null;

  const nextStep = await prisma.step.findFirst({
    where: {
      rank: { gt: step.rank },
    },
    orderBy: { rank: "asc" },
  });

  return nextStep
    ? StepDtoSchema.parse({
        ...nextStep,
        latitude: Number(step.latitude),
        longitude: Number(step.longitude),
      })
    : null;
};

export type GetStepAfterQuery = Prisma.PromiseReturnType<
  typeof GetStepAfterQuery
>;
