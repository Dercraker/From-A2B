import { prisma } from "@/lib/prisma";
import { getMiddleRank } from "@/utils/getMiddleRank";
import { StepDto } from "../dto/stepDto.schema";

type ReSortStepsQueryType = {
  steps: StepDto[];
};

export const ReSortStepsQuery = async ({ steps }: ReSortStepsQueryType) => {
  if (!steps.length) return;

  let previousRank = undefined;

  for (const step of steps) {
    const newRank = getMiddleRank({
      downRank: undefined,
      upRank: previousRank,
    });

    await prisma.step.update({
      where: { id: step.id },
      data: { rank: newRank },
    });

    previousRank = newRank;
  }
};
