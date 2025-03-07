"use client";

import { alertDialog } from "@feat/alert-dialog/alert-dialog-store";
import { DeleteStepAction } from "@feat/steps/delete/deleteStep.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { TRIP_KEY_Factory } from "@feat/trip/tripKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { phCapture } from "@lib/postHog/eventCapture";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { StepPathParams } from "@type/next";
import { useParams } from "next/navigation";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";
import { Typography } from "../ui/typography";

export type DeleteStepAlertDialogProps = PropsWithChildren<{
  name: string;
  stepId: string;
  onDeleted?: () => void;
}>;

export const DeleteStepAlertDialog = ({
  name,
  stepId,
  children,
  onDeleted,
}: DeleteStepAlertDialogProps) => {
  const queryClient = useQueryClient();
  const { tripSlug } = useParams<StepPathParams>();

  const { isPending, mutateAsync: deleteStepAsync } = useMutation({
    mutationFn: async () => {
      const result = await DeleteStepAction({
        stepId,
      });
      if (!isActionSuccessful(result))
        return toast.error("An error occurred when deleting the step", {
          description: "Please try again later or contact support",
        });

      toast.success(`Step "${name}" deleted successfully`);
      if (onDeleted) onDeleted();
      await queryClient.invalidateQueries({
        queryKey: TRIP_KEY_Factory.roads(tripSlug),
      });
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.All(tripSlug),
      });

      phCapture("RemoveStep");
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
          loading: isPending,
          action: {
            label: "Delete",
            onClick: async () => {
              await deleteStepAsync();
            },
          },
        })
      }
    >
      {children}
    </div>
  );
};
