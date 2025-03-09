import { TaskSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type AddTaskToStepQueryProps = {
  where: Prisma.StepWhereUniqueInput;
  data: Prisma.TaskCreateWithoutStepInput;
};

export const AddTaskToStepQuery = async ({
  data,
  where,
}: AddTaskToStepQueryProps) => {
  const task = await prisma.step.update({
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

  return TaskSchema.parseAsync(task);
};

export type AddTaskToStepQuery = Prisma.PromiseReturnType<
  typeof AddTaskToStepQuery
>;
