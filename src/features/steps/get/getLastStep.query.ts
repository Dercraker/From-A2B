import type { Step } from "@generated/modelSchema";
import { StepSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";

type GetLastStepQueryType = {
  tripSlug: string;
};

export const GetLastStepQueryByTripSlug = async ({
  tripSlug,
}: GetLastStepQueryType): Promise<Step | null> => {
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
    ? StepSchema.parse({
        ...lastStep,
        latitude: Number(lastStep.latitude),
        longitude: Number(lastStep.longitude),
      })
    : null;
};
