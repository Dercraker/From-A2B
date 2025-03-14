import { TaskSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
type UpdateTaskQueryProps = {
  taskId: string;
  dueDate?: Date;
  title?: string;
};

export const UpdateTaskQuery = async ({
  taskId,
  dueDate,
  title,
}: UpdateTaskQueryProps) => {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      dueDate: dueDate ?? null,
      title,
    },
  });

  return TaskSchema.parseAsync(task);
};

export type UpdateTaskQuery = Prisma.PromiseReturnType<typeof UpdateTaskQuery>;
