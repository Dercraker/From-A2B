import { prisma } from "@lib/prisma";
import type { TaskStatusType } from "./taskStatus.schema";

type UpdateTaskStatusByTaskIdQueryProps = {
  taskId: string;
  state: TaskStatusType;
};

export const UpdateTaskStatusByTaskIdQuery = async ({
  taskId,
  state,
}: UpdateTaskStatusByTaskIdQueryProps) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      state,
    },
  });

  return updatedTask;
};
