"use client";

import { EditTripForm } from "@components/trips/editTripForm";
import { Dialog, DialogContent } from "@components/ui/dialog";
import { LINKS } from "@feat/navigation/Links";
import { usePathname, useRouter } from "next/navigation";
import { useNextStep } from "nextstepjs";

export type DetailsDialogProps = {
  orgSlug: string;
  tripSlug: string;
};

export const DetailsDialog = ({ tripSlug, orgSlug }: DetailsDialogProps) => {
  const router = useRouter();
  const path = usePathname();

  const uri = LINKS.Trips.Trip.href({ orgSlug, tripSlug });

  const { currentTour } = useNextStep();

  return (
    <Dialog
      open={path.includes(uri)}
      onOpenChange={(open) => {
        if (!open && !currentTour) {
          router.back();
        }
      }}
    >
      <DialogContent>
        <EditTripForm
          tripSlug={tripSlug}
          className="border-transparent bg-transparent"
        />
      </DialogContent>
    </Dialog>
  );
};
