"use client";

import { AddStepDialog } from "@/components/steps/addStepDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Typography } from "@/components/ui/typography";
import { LINKS } from "@/features/navigation/Links";
import { GetAllStepAction } from "@/features/steps/get/getAllStep.action";
import { STEP_KEY_FACTORY } from "@/features/steps/stepKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { GenerateOrganizationLink } from "../../../(navigation)/_navigation/org-navigation.links";
import { StepItem } from "./stepItem";

export type StepListProps = {
  tripId: string;
  tripSlug: string;
  orgSlug: string;
};

export const StepList = ({ tripId, orgSlug, tripSlug }: StepListProps) => {
  const { data: steps, isPending } = useQuery({
    queryKey: STEP_KEY_FACTORY.All(tripId),
    queryFn: async () => {
      const result = await GetAllStepAction({ tripId });

      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch steps. Please try again later.");
        return null;
      }

      return result.data.data;
    },
  });

  if (isPending || steps == undefined)
    return (
      <div className="flex w-2/5 items-center justify-center border-r bg-card">
        <div className="flex select-none items-center gap-2">
          <Typography variant="lead">Loading steps in progress</Typography>
          <Loader className="text-primary" />
        </div>
      </div>
    );

  if (steps === null)
    return (
      <div className="flex w-2/5 items-center justify-center border-r bg-card">
        <div className="flex select-none flex-col">
          <Typography variant="lead">
            Failed to fetch steps. Please try again later.
          </Typography>
          <Link
            href={GenerateOrganizationLink(
              LINKS.Organization.Trips.href,
              orgSlug,
            )}
            className={buttonVariants({ variant: "outline" })}
          >
            Back to trip list
          </Link>
        </div>
      </div>
    );

  return (
    <div className="w-2/5 border-r bg-card">
      {!!steps.length && steps.map((s) => <StepItem key={s.id} step={s} />)}

      {!steps.length && (
        <div className="mt-4 flex select-none flex-col items-center justify-center">
          <Typography variant="lead">No steps found</Typography>
          <AddStepDialog>
            <Button variant="outline">Add your first Step !</Button>
          </AddStepDialog>
        </div>
      )}
    </div>
  );
};
