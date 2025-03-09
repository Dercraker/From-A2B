import { TaskSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
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

  return TaskSchema.parseAsync(updatedTask);
};

export type UpdateTaskStatusByTaskIdQuery = Prisma.PromiseReturnType<
  typeof UpdateTaskStatusByTaskIdQuery
>;
