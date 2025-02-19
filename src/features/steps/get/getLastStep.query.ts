import { prisma } from "@lib/prisma";
import type { StepDto } from "../dto/stepDto.schema";
import { StepDtoSchema } from "../dto/stepDto.schema";

type GetLastStepQueryType = {
  tripSlug: string;
};

export const GetLastStepQueryByTripSlug = async ({
  tripSlug,
}: GetLastStepQueryType): Promise<StepDto | null> => {
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
    ? StepDtoSchema.parse({
        ...lastStep,
        latitude: Number(lastStep.latitude),
        longitude: Number(lastStep.longitude),
      })
    : null;
};
