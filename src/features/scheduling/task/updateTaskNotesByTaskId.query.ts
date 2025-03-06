import { prisma } from "@lib/prisma";

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

  return updatedTask.notes;
};
