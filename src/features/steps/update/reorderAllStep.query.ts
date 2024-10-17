import { prisma } from "@/lib/prisma";
import { getMiddleRank } from "@/utils/getMiddleRank";

type ReorderAllStepQueryProps = {
  tripSlug: string;
};

export const ReorderAllStepQuery = async ({
  tripSlug,
}: ReorderAllStepQueryProps) => {
  const steps = await prisma.step.findMany({
    where: {
      trip: { slug: tripSlug },
    },
    orderBy: { rank: "asc" },
  });

  if (steps.length === 0) return;

  let previousRank = undefined;

  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];

    const newRank = getMiddleRank({
      downRank: undefined,
      upRank: previousRank,
    });

    await prisma.step.update({
      where: { id: currentStep.id },
      data: { rank: newRank },
    });

    previousRank = newRank;
  }
};
