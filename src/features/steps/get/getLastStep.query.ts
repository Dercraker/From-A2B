import { prisma } from "@/lib/prisma";
import { StepDto, StepDtoSchema } from "../dto/stepDto.schema";

type GetLastStepQueryType = {
  tripId: string;
};

export const GetLastStepQueryByTripId = async ({
  tripId,
}: GetLastStepQueryType): Promise<StepDto | null> => {
  const lastStep = await prisma.step.findFirst({
    where: {
      tripId
    },
    orderBy: {
      rank: "desc",
    },
  });

  return lastStep ? StepDtoSchema.parse(lastStep) : null;
};
