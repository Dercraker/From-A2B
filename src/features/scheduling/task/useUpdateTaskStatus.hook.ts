import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TaskStatusType } from "./taskStatus.schema";
import { UpdateTaskStatusAction } from "./updateTaskStatus.action";

type UseUpdateTaskStatusProps = {
  tripSlug: string;
  stepSlug: string;
};

export const useUpdateTaskStatus = ({
  tripSlug,
  stepSlug,
}: UseUpdateTaskStatusProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      state,
    }: {
      taskId: string;
      state: TaskStatusType;
    }) => {
      const result = await UpdateTaskStatusAction({
        taskId,
        state,
      });

      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError ?? "Failed to update task status");
        return;
      }

      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
      });
      toast.success("Task status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task status");
    },
  });
};
