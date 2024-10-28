import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepDtoSchema } from "../dto/stepDto.schema";

type GetStepBySlugQueryType = {
  stepSlug: string;
  where?: Prisma.StepWhereUniqueInput;
};

export const GetStepBySlugQuery = async ({
  stepSlug,
  where,
}: GetStepBySlugQueryType) => {
  const step = await prisma.step.findUniqueOrThrow({
    where: { ...where, slug: stepSlug },
  });

  return StepDtoSchema.safeParse(step);
};

export type GetStepBySlugQuery = NonNullable<
  Prisma.PromiseReturnType<typeof GetStepBySlugQuery>
>;
