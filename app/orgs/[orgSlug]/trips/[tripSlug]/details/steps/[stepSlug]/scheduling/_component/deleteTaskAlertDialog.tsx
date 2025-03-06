"use client";

import { alertDialog } from "@feat/alert-dialog/alert-dialog-store";
import { DeleteTaskAction } from "@feat/scheduling/deleteTask.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { phCapture } from "@lib/postHog/eventCapture";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "@ui/typography";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export type DeleteTaskAlertDialogProps = {
  taskId: string;
  taskName: string;
  tripSlug: string;
  stepSlug: string;
};

export const DeleteTaskAlertDialog = ({
  taskId,
  taskName,
  tripSlug,
  stepSlug,
}: DeleteTaskAlertDialogProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: deleteTaskAsync } = useMutation({
    mutationFn: async () => {
      const result = await DeleteTaskAction({ taskId });
      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError ?? "Failed to delete task");
        return;
      }

      toast.success("Task deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
      });
    },
  });
  return (
    <Trash2
      size={24}
      className="hidden cursor-pointer text-red-400 group-hover:block"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        alertDialog.add({
          title: `Delete task : ${taskName}`,
          description: (
            <>
              <Typography variant="lead" className="text-base">
                Are you sure you want to delete this task ?
              </Typography>
              <Typography variant="muted" className="italic">
                If you delete this task, all the data associated with it will be
                lost.
              </Typography>
            </>
          ),
          loading: isPending,
          action: {
            label: "Delete",
            onClick: async () => {
              await deleteTaskAsync();
              phCapture("TaskDelete");
            },
          },
        });
      }}
    />
  );
};
