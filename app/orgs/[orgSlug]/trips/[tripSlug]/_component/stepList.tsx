"use client";

import { AddStepDialog } from "@/components/steps/addStepDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "@/components/ui/typography";
import { LINKS } from "@/features/navigation/Links";
import { GetAllStepAction } from "@/features/steps/get/getAllStep.action";
import { STEP_KEY_FACTORY } from "@/features/steps/stepKey.factory";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log("🚀 ~ handleDragEnd ~ over:", over);
    console.log("🚀 ~ handleDragEnd ~ active:", active);

    // if (active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id);
    //     const newIndex = items.indexOf(over.id);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
  }

  const { data: steps, isPending } = useQuery({
    queryKey: STEP_KEY_FACTORY.All(tripSlug),
    queryFn: async () => {
      const result = await GetAllStepAction({ tripId });
      if (!isActionSuccessful(result)) {
        toast.error("Failed to fetch steps. Please try again later.");
        return null;
      }

      return result.data.data;
    },
  });

  if (isPending)
    return (
      <div className="flex w-2/5 items-center justify-center border-r bg-muted/40">
        <div className="flex select-none items-center gap-2">
          <Typography variant="lead">Loading steps in progress</Typography>
          <Loader className="text-primary" />
        </div>
      </div>
    );

  if (!steps)
    return (
      <div className="flex w-2/5 items-center justify-center border-r bg-muted/40 p-4">
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
    <div className="flex h-full w-2/5 flex-col overflow-hidden border-r">
      {!!steps.length && (
        <>
          <ScrollArea className="flex h-full grow">
            {steps.map((step, idx) => (
              <StepItem key={step.id} step={step} idx={idx} />
            ))}
          </ScrollArea>
          <div className="my-2  flex w-full justify-center px-4">
            <AddStepDialog>
              <Button variant="outline" className="w-full">
                Add new step
              </Button>
            </AddStepDialog>
          </div>
        </>
      )}

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
