"use client";

import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TaskDto } from "../dto/taskDto.schema";
import { ReSortTasksAction } from "./reSortTasks.action";

type UseResortTasksProps = {
  stepSlug: string;
  tripSlug: string;
};

export const useResortTasks = ({ stepSlug, tripSlug }: UseResortTasksProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tasks }: { tasks: TaskDto[] }) => {
      const result = await ReSortTasksAction({
        tasks,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError ?? "Failed to resort tasks");
        return;
      }

      toast.success("Tasks resorted successfully");

      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
      });
    },
  });
};
