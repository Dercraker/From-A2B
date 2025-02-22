import { prisma } from "@lib/prisma";
import { GetStepRank, RankStep } from "@utils/GetStepRank";
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
//TODO Ne pas refaire #reorderAllStep.query.ts
export const ReSortStepsQuery = async ({ steps }: ReSortStepsQueryType) => {
  if (!steps.length) return;

  const updatePromises = steps.map(async (step, idx) => {
    await updateStepRank(step, RankStep * (idx + 1));
  });

  await Promise.all(updatePromises);
};
