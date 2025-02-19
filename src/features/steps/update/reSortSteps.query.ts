import { prisma } from "@lib/prisma";
import { GetStepRank } from "@utils/GetStepRank";
import type { StepDto } from "../dto/stepDto.schema";

type ReSortStepsQueryType = {
  steps: StepDto[];
};

const updateStepRank = async (
  step: StepDto,
  previousRank: number | undefined,
) => {
  const newRank = GetStepRank({
    previousRank: undefined,
    nextRank: previousRank,
  });

  await prisma.step.update({
    where: { id: step.id },
    data: { rank: newRank },
  });

  return newRank;
};

export const ReSortStepsQuery = async ({ steps }: ReSortStepsQueryType) => {
  if (!steps.length) return;

  let previousRank: number | undefined = undefined;

  const updatePromises = steps.map(async (step) => {
    previousRank = await updateStepRank(step, previousRank);
  });

  await Promise.all(updatePromises);
};
