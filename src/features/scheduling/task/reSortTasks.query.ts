import { prisma } from "@lib/prisma";
import { GetStepRank, RankStep } from "@utils/GetStepRank";
import type { TaskDto } from "../dto/taskDto.schema";

type ReSortTasksQueryType = {
  tasks: TaskDto[];
};

const updateTaskRank = async (
  task: TaskDto,
  previousRank: number | undefined,
) => {
  const newRank = GetStepRank({
    previousRank: undefined,
    nextRank: previousRank,
  });

  await prisma.task.update({
    where: { id: task.id },
    data: { rank: newRank },
  });

  return newRank;
};

export const ReSortTasksQuery = async ({ tasks }: ReSortTasksQueryType) => {
  if (!tasks.length) return;

  const updatePromises = tasks.map(async (task, idx) => {
    await updateTaskRank(task, RankStep * (idx + 1));
  });

  await Promise.all(updatePromises);
};
