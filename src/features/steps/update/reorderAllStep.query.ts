import { prisma } from "@/lib/prisma";
import { RankStep } from "@/utils/GetStepRank";

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

  if (steps.length < 2) return;

  const updates = steps.map((step, idx) => ({
    id: step.id,
    rank: (idx + 1) * RankStep,
  }));

  await prisma.$transaction(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    updates.map((step) =>
      prisma.step.update({
        where: { id: step.id },
        data: { rank: step.rank },
      }),
    ),
  );
};
