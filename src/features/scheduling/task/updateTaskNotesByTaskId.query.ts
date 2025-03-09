import { TaskSchema } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";
type UpdateTaskNotesByTaskIdQueryProps = {
  taskId: string;
  markdown: string;
};

export const UpdateTaskNotesByTaskIdQuery = async ({
  taskId,
  markdown,
}: UpdateTaskNotesByTaskIdQueryProps) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      notes: markdown,
    },
  });

  return TaskSchema.parseAsync(updatedTask);
};

export type UpdateTaskNotesByTaskIdQuery = Prisma.PromiseReturnType<
  typeof UpdateTaskNotesByTaskIdQuery
>;
