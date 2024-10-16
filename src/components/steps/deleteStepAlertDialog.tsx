"use client";

import { alertDialog } from "@/features/alert-dialog/alert-dialog-store";
import { DeleteStepAction } from "@/features/steps/delete/deleteStep.action";
import { STEP_KEY_FACTORY } from "@/features/steps/stepKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { Typography } from "../ui/typography";

export type DeleteStepAlertDialogProps = PropsWithChildren<{
  name: string;
  stepId: string;
}>;

export const DeleteStepAlertDialog = ({
  name,
  stepId,
  children,
}: DeleteStepAlertDialogProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const tripSlug = params.tripSlug as string;

  const { isPending, mutateAsync: deleteStepAsync } = useMutation({
    mutationFn: async () => {
      const result = await DeleteStepAction({
        stepId,
      });
      if (!isActionSuccessful(result)) {
        toast.error(result?.serverError);
      }
    },
    onSuccess: () => {
      toast.success(`Step "${name}" deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(tripSlug),
      });
    },
  });

  return (
    <div
      onClick={() =>
        alertDialog.add({
          title: `Delete step : "${name}"`,
          description: (
            <>
              <Typography variant="lead" className="text-base">
                Are you sure you want to delete this step ?
              </Typography>
              <Typography variant="muted" className="italic">
                If you delete this step, all the data associated with it will be
                lost.
              </Typography>
            </>
          ),
          confirmText: name,
          loading: isPending,
          action: {
            label: "Delete",
            onClick: async () => {
              deleteStepAsync();
            },
          },
        })
      }
    >
      {children}
    </div>
  );
};
