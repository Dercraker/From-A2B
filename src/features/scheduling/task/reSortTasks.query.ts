import { ReSortEntities } from "@utils/reSort";
import type { TaskDto } from "../dto/taskDto.schema";

type ReSortTasksQueryType = {
  tasks: TaskDto[];
};

export const ReSortTasksQuery = async ({ tasks }: ReSortTasksQueryType) => {
  await ReSortEntities({
    entities: tasks,
    entityType: "task",
  });
};
