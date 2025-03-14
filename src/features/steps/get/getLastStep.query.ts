import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
type GetLastStepQueryType = {
  tripSlug: string;
};

export const GetLastStepQueryByTripSlug = async ({
  tripSlug,
}: GetLastStepQueryType) => {
  const lastStep = await prisma.step.findFirst({
    where: {
      trip: {
        slug: tripSlug,
      },
    },
    orderBy: {
      rank: "desc",
    },
  });

  return lastStep
    ? StepSchema.parseAsync({
        ...lastStep,
        latitude: Number(lastStep.latitude),
        longitude: Number(lastStep.longitude),
      })
    : null;
};

export type GetLastStepQueryByTripSlug = Prisma.PromiseReturnType<
  typeof GetLastStepQueryByTripSlug
>;
