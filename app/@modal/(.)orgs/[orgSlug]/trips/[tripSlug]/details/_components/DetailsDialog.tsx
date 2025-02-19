"use client";

import { EditTripForm } from "@components/trips/editTripForm";
import { Dialog, DialogContent } from "@components/ui/dialog";
import { GenerateTripLink } from "@feat/trips/trips.link";
import { usePathname, useRouter } from "next/navigation";

export type DetailsDialogProps = {
  orgSlug: string;
  tripSlug: string;
};

export const DetailsDialog = ({ tripSlug, orgSlug }: DetailsDialogProps) => {
  const router = useRouter();
  const path = usePathname();

  const uri = GenerateTripLink({ orgSlug, tripSlug });

  return (
    <Dialog
      open={path.includes(uri)}
      onOpenChange={(open) => {
        if (!open) {
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
