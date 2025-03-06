import { prisma } from "@lib/prisma";

type DeleteTaskQueryProps = {
  taskId: string;
};

export const DeleteTaskQuery = async ({ taskId }: DeleteTaskQueryProps) => {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};
