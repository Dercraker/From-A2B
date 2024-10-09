"use client";

import { InlineTooltip } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { alertDialog } from "@/features/alert-dialog/alert-dialog-store";
import { DeleteTripAction } from "@/features/trip/delete/deleteTrip.action";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type CardDeleteButtonProps = {
  tripId: string;
  tripName: string;
};

export const CardDeleteButton = ({
  tripId,
  tripName,
}: CardDeleteButtonProps) => {
  const router = useRouter();

  const { isPending, mutateAsync: deleteTripAsync } = useMutation({
    mutationFn: async () => {
      const result = await DeleteTripAction({ tripId });
      if (result?.serverError) {
        toast.error(result.serverError);
      }
    },
    onSuccess: () => {
      toast.success(`Trip ${tripName} deleted successfully`);
      router.refresh();
    },
  });

  return (
    <InlineTooltip title="Delete Trip">
      <Trash2
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          alertDialog.add({
            title: `Delete trip : ${tripName}`,
            description: (
              <>
                <Typography variant="lead" className="text-base">
                  Are you sure you want to delete this trip ?
                </Typography>
                <Typography variant="muted" className="italic">
                  If you delete this trip, all the data associated with it will
                  be lost.
                </Typography>
              </>
            ),
            loading: isPending,
            confirmText: tripName,
            action: {
              label: "Delete",
              onClick: async () => {
                deleteTripAsync();
              },
            },
          });
        }}
        size={24}
        className="hidden cursor-pointer text-red-400 group-hover:block "
      />
    </InlineTooltip>
  );
};
