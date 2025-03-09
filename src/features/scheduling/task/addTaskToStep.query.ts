import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type AddTaskToStepQueryProps = {
  where: Prisma.StepWhereUniqueInput;
  data: Prisma.TaskCreateWithoutStepInput;
};

export const AddTaskToStepQuery = async ({
  data,
  where,
}: AddTaskToStepQueryProps) =>
  prisma.step.update({
    where: {
      ...where,
    },
    data: {
      Task: {
        create: {
          ...data,
        },
      },
    },
  });
