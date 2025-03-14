import { TaskSchema, type Task } from "@generated/modelSchema";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTasksByStepSlugQueryProps = {
  stepSlug: string;
  orderBy?: Prisma.TaskOrderByWithRelationInput;
};

/**
 * Récupère toutes les tâches associées à une étape en fonction de son slug
 * @param stepSlug - Le slug de l'étape
 * @param orderBy - Options de tri (champ et direction)
 * @returns Une liste de tâches
 */
export const GetTasksByStepSlugQuery = async ({
  stepSlug,
  orderBy,
}: GetTasksByStepSlugQueryProps) => {
  const step = await prisma.step.findUnique({
    where: {
      slug: stepSlug,
    },
    include: {
      Task: {
        ...(orderBy && { orderBy }),
      },
    },
  });

  if (!step) {
    return null;
  }

  const tasks = await Promise.all(
    step.Task.map(async (task: Task) => TaskSchema.parseAsync(task)),
  );

  return tasks;
};

export type GetTasksByStepSlugQueryType = Prisma.PromiseReturnType<
  typeof GetTasksByStepSlugQuery
>;
