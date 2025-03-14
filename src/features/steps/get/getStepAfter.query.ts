import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

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
      tripId: step.tripId,
    },
    orderBy: { rank: "asc" },
  });

  return nextStep
    ? StepSchema.parseAsync({
        ...nextStep,
        latitude: Number(nextStep.latitude),
        longitude: Number(nextStep.longitude),
      })
    : null;
};

export type GetStepAfterQuery = Prisma.PromiseReturnType<
  typeof GetStepAfterQuery
>;
