import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { StepDtoSchema } from "../dto/stepDto.schema";

type GetStepQueryProps = { where: Prisma.StepWhereUniqueInput };

export const GetStepQuery = async ({ where }: GetStepQueryProps) => {
  const step = await prisma.step.findFirst({
    where: {
      ...where,
    },
  });
  return StepDtoSchema.parse(step);
};
