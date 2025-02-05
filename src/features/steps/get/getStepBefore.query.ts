import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepDtoSchema } from "../dto/stepDto.schema";

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
    },
    orderBy: { rank: "desc" },
  });

  return previousStep
    ? StepDtoSchema.parse({
        ...previousStep,
        latitude: Number(step.latitude),
        longitude: Number(step.longitude),
      })
    : null;
};

export type GetStepBeforeQuery = Prisma.PromiseReturnType<
  typeof GetStepBeforeQuery
>;
