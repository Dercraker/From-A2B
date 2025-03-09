import type { Task } from "@generated/modelSchema";
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
