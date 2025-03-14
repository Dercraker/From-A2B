import type { Task } from "@generated/modelSchema";
import type { Prisma } from "@prisma/client";
import { ReSortEntities } from "@utils/reSort";

type ReSortTasksQueryType = {
  tasks: Task[];
};

export const ReSortTasksQuery = async ({ tasks }: ReSortTasksQueryType) => {
  await ReSortEntities({
    entities: tasks,
    entityType: "task",
  });
};

export type ReSortTasksQuery = Prisma.PromiseReturnType<
  typeof ReSortTasksQuery
>;
