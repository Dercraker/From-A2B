import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

export const GetStepBeforeQuery = async ({
  ...where
}: Prisma.StepWhereUniqueInput) => {
  const step = await prisma.step.findUnique({
    where,
  });
  if (!step) return null;

  const previousStep = await prisma.step.findFirst({
    where: {
      rank: { lt: step.rank },
      tripId: step.tripId,
    },
    orderBy: { rank: "desc" },
  });
  return previousStep
    ? StepSchema.parseAsync({
        ...previousStep,
        latitude: Number(previousStep.latitude),
        longitude: Number(previousStep.longitude),
      })
    : null;
};

export type GetStepBeforeQuery = Prisma.PromiseReturnType<
  typeof GetStepBeforeQuery
>;
