import { prisma } from "@lib/prisma";
import type { Prisma, Task } from "@prisma/client";
import { TaskSchema, type TaskDto } from "./dto/taskDto.schema";

type GetTasksByStepSlugQueryProps = {
  stepSlug: string;
  orderBy?: {
    field: keyof Task;
    direction: "asc" | "desc";
  };
};

/**
 * Récupère toutes les tâches associées à une étape en fonction de son slug
 * @param stepSlug - Le slug de l'étape
 * @param orderBy - Options de tri (champ et direction)
 * @returns Une liste de tâches
 */
export const GetTasksByStepSlugQuery = async ({
  stepSlug,
  orderBy = { field: "rank", direction: "asc" },
}: GetTasksByStepSlugQueryProps): Promise<TaskDto[] | null> => {
  const step = await prisma.step.findUnique({
    where: {
      slug: stepSlug,
    },
    include: {
      Task: {
        orderBy: {
          [orderBy.field]: orderBy.direction,
        },
      },
    },
  });

  if (!step) {
    return null;
  }

  return step.Task.map((task: Task) => TaskSchema.parse(task));
};

export type GetTasksByStepSlugQueryType = Prisma.PromiseReturnType<
  typeof GetTasksByStepSlugQuery
>;
