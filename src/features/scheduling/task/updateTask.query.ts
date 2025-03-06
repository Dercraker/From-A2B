import { prisma } from "@lib/prisma";

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

  return task;
};
