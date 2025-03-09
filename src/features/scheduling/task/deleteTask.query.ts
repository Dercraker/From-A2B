import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
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

export type DeleteTaskQuery = Prisma.PromiseReturnType<typeof DeleteTaskQuery>;
