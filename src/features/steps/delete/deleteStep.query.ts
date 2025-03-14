import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

export const DeleteStepQuery = async ({ where }: Prisma.StepDeleteArgs) => {
  await prisma.step.delete({ where });
};

export type DeleteStepQuery = Prisma.PromiseReturnType<typeof DeleteStepQuery>;
